require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getConnection } = require('../db');

const {
  userSchema,
  editUserSchema,
  editPasswordUserSchema,
  userSchemaRegister
} = require('./validations');

const {
  processAndSavePhoto,
  deletePhoto,
  randomString,
  sendEmail,
  generateError,
  formatDateToDB
} = require('../helpers');

// POST - /user
async function newUser(req, res, next) {
  let connection;
  try {
    // Validate body payload
    await userSchemaRegister.validateAsync(req.body);

    connection = await getConnection();
    const { email, password, nickname, name } = req.body;

    // Check if user email is already in the db
    const [
      existing
    ] = await connection.query('SELECT id from users where email=?', [email]);

    if (existing.length) {
      throw generateError('El email ya existe en la base de datos', 409);
    }

    // hash password
    const dbPassword = await bcrypt.hash(password, 10);
    const registrationCode = randomString(40);

    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

    try {
      await sendEmail({
        email: email,
        title: 'Valida tu cuenta de usuario en la app de diario mysql',
        content: `Para validar tu cuenta de usuario pega esta url en tu navegador: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error(
        'Error en el envío de mail. Inténtalo de nuevo más tarde.'
      );
    }

    await connection.query(
      `
      INSERT INTO users ( lastPasswordUpdate, email, password, role, registrationCode,nickname,name)
      VALUES( UTC_TIMESTAMP, ?, ?, "normal", ?,?,?)
    `,
      [email, dbPassword, registrationCode, nickname, name]
    );

    res.send({
      staus: 'ok',
      message:
        'Usuario registrado. Mira tu email para activarlo. Mira la carpeta del SPAM que seguro que está allí.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function validateUser(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();

    // Actualizamos el usuario
    const [
      result
    ] = await connection.query(
      'UPDATE users SET active=1,registrationCode=NULL WHERE registrationCode=?',
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError('Validación incorrecta', 400);
    }

    // // Si queremos dar el token descomentar las siguientes líneas
    // const [user] = await connection.query('SELECT role from users where id=?', [
    //   id
    // ]);

    // // Build jsonwebtoken
    // const tokenPayload = { id: id, role: user[0].role };
    // const token = jwt.sign(tokenPayload, process.env.SECRET, {
    //   expiresIn: '30d'
    // });

    res.send({
      status: 'ok',
      message: 'Usuario validado, ya puedes hacer login.'
      // data: {
      //   token
      // }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// GET - /users/:id
async function getUser(req, res, next) {
  let connection;

  try {
    const { id } = req.params;
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id, create_user, email, role, name, avatar,city,community,phone
      FROM users WHERE id=?  
    `,
      [id]
    );

    // Throw 404 if no results
    if (!result.length) {
      throw generateError(`There is no user with the id ${id}`, 404);
    }

    const [userData] = result;

    const payload = {
      registrationDate: formatDateToDB(userData.create_user),
      realName: userData.name,
      avatar: userData.avatar,
      city: userData.city,
      community: userData.community
    };

    if (userData.id === req.auth.id || req.auth.role === 'admin') {
      payload.email = userData.email;
      payload.role = userData.role;
      payload.phone = userData.phone;
    }

    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// POST - /users/login
async function loginUser(req, res, next) {
  let connection;

  try {
    await userSchema.validateAsync(req.body);

    const { email, password } = req.body;

    connection = await getConnection();

    // Find the user in the db by email
    const [
      dbUser
    ] = await connection.query(
      'SELECT id, email, password, role from users where email=? AND active=1',
      [email]
    );

    if (!dbUser.length) {
      throw generateError(
        'No hay ningún usuario activo con ese email en la base de datos. Si te acabas de registrar valida el email',
        404
      );
    }

    const [user] = dbUser;

    const passwordsMath = await bcrypt.compare(password, user.password);

    if (!passwordsMath) {
      throw generateError('Password incorrecta', 401);
    }

    // Build jsonwebtoken
    const tokenPayload = { id: user.id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '30d'
    });

    // Create response
    res.send({
      status: 'ok',
      message: 'Login correcto',
      data: { token }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// PUT - /users/:id
async function editUser(req, res, next) {
  let connection;

  try {
    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const { name, email, city, community, phone } = req.body;

    connection = await getConnection();

    // Check if user exists

    const [current] = await connection.query(
      `
      SELECT id, avatar FROM users WHERE id=?
    `,
      [id]
    );

    if (!current.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    // Check if auth user is the same as :id or is admin
    if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('No tienes permisos para editar este usuario', 401);
    }

    // Check if there is a uploaded avatar and process it

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSavePhoto(req.files.avatar);

        if (current && current.avatar) {
          await deletePhoto(current.avatar);
        }
      } catch (error) {
        throw generateError('Can not process upload image. Try again.', 400);
      }
    } else {
      savedFileName = current.avatar;
    }

    // Update user

    if (name) {
      await connection.query(
        `
      UPDATE users SET name=? WHERE id=?
    `,
        [name, id]
      );
    }

    if (email) {
      await connection.query(
        `
      UPDATE users SET email=? WHERE id=?
    `,
        [email, id]
      );
    }

    if (req.files && req.files.avatar) {
      await connection.query(
        `
      UPDATE users SET avatar=? WHERE id=?
    `,
        [savedFileName, id]
      );
    }

    if (city) {
      await connection.query(
        `
      UPDATE users SET city=? WHERE id=?
    `,
        [city, id]
      );
    }

    if (community) {
      await connection.query(
        `
      UPDATE users SET community=? WHERE id=?
    `,
        [community, id]
      );
    }
    if (phone) {
      await connection.query(
        `
      UPDATE users SET phone=? WHERE id=?
    `,
        [phone, id]
      );
    }

    res.send({ status: 'ok', message: 'Usuario actualizado' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// POST - /users/:id/password
async function updatePasswordUser(req, res, next) {
  let connection;

  try {
    const { id } = req.params;
    // body: oldpassword, newPassword, newPasswordRepeat (opcional)
    connection = await getConnection();

    await editPasswordUserSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    // Comprobar que el usuario del token es el mismo que el que vamos a cambiar la pass

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `No tienes permisos para cambiar la password del usuario con id ${id}`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError(
        'La nueva password no puede ser la misma que la antigua',
        400
      );
    }

    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(
      `
      SELECT id, password from users where id=?
      `,
      [id]
    );

    // Código un poco redundante
    if (!currentUser.length) {
      throw generateError(`El usuario con id ${id} no existe`, 404);
    }

    const [dbUser] = currentUser;

    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: passord sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.password);

    if (!passwordsMath) {
      throw generateError('Tu password antigua es incorrecta', 401);
    }

    // generar hash de la password
    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    // actualizar la base de datos
    await connection.query(
      `
      UPDATE users SET password=?, lastPasswordUpdate=UTC_TIMESTAMP WHERE id=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: 'ok',
      message:
        'Cambio de password realizado correctamente. Todos tus tokens quedan invalidados. Haz login de nuevo para conseguir un token válido.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const connection = await getConnection();

    // Delete image if exists!
    const [
      current
    ] = await connection.query('SELECT avatar from users where id=?', [id]);

    if (!current.length) {
      const error = new Error(`There is no user with id ${id}`);
      error.httpCode = 400;
      throw error;
    }

    if (current.avatar) {
      await deletePhoto(current.avatar);
    }

    await connection.query(`
    delete from equipment where space_id = (
      select id from spaces where owner_id = ?);`, [id]);
    await connection.query(`
    delete from incidents where reserve_id =
    (select id from reserves where space_id = (
      select id from spaces where owner_id = ?)
          );`, [id]);

    await connection.query(`delete from reserves where space_id =(
      select id from spaces where owner_id = ?);`, [id]);

    await connection.query(`delete from ratings where user_id=? ;`,[id]);

    await connection.query(`delete from ratings where user_id =?;`,[id]);

    await connection.query(`delete from spaces where owner_id = ?;`,[id]);

    await connection.query(`delete from users where id = ?;`,[id]);

    connection.release();

    res.send({
      status: 'ok',
      message: `The entry with id ${id} has been deleted`
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newUser,
  loginUser,
  getUser,
  editUser,
  updatePasswordUser,
  validateUser,
  deleteUser
};
