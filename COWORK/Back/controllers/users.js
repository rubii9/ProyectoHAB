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

// POST - /users
async function newUser(req, res, next) {
  let connection;
  try {
    // Validate body payload
    await userSchemaRegister.validateAsync(req.body);

    connection = await getConnection();
    const { email, password, name, city, community } = req.body;

    // Check if user email is already in the db
    const [
      existing
    ] = await connection.query('SELECT id from users where email=?', [email]);

    if (existing.length) {
      throw generateError('The email already exits', 409);
    }

    // hash password
    const dbPassword = await bcrypt.hash(password, 10);
    const registrationCode = randomString(40);

    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

    try {
      await sendEmail({
        email: email,
        title: 'Validación de usuario Coworking.com',
        content: `Para validar el usuario haz clic en el enlace o copia y pega en tu navegador: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error sending email. Try again later.');
    }

    await connection.query(
      `
      INSERT INTO users ( lastPasswordUpdate, email, password, role, registrationCode,name,city,community)
      VALUES( UTC_TIMESTAMP, ?, ?, "normal", ?,?,?,?)
    `,
      [email, dbPassword, registrationCode, name, city, community]
    );

    res.send({
      staus: 'ok',
      message:
        'User registered. Check your email to activate (the email is maybe at spam).'
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
      throw generateError('Invalid validation', 400);
    }

    res.send({
      status: 'ok',
      message: 'Usuario validado ya puedes hacer login.'
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
        'There are no user with this email. If you have registered you need to validate email',
        404
      );
    }

    const [user] = dbUser;

    const passwordsMath = await bcrypt.compare(password, user.password);

    if (!passwordsMath) {
      throw generateError('Invalid password ', 401);
    }

    // Build jsonwebtoken
    const tokenPayload = { id: user.id, role: user.role, email: user.email };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '30d'
    });

    // Create response
    res.send({
      status: 'ok',
      message: 'Login successfull',
      data: { token, tokenPayload }
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
      throw generateError('No permission to edit this user', 401);
    }

    // Check if there is a uploaded avatar and process it

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSavePhoto(req.files.avatar);

        if (current && current[0].avatar) {
          await deletePhoto(current[0].avatar);
        }
      } catch (error) {
        throw generateError('Can not process upload image. Try again.', 400);
      }
    } else {
      savedFileName = current[0].avatar;
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

    res.send({ status: 'ok', message: 'User actualizated' });
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
        `You have not permissions to change password of user whit id ${id}`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError(
        'New password need to be diferent from old password',
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
      throw generateError(`User with id ${id} does not exist`, 404);
    }

    const [dbUser] = currentUser;

    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: passord sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.password);

    if (!passwordsMath) {
      throw generateError('Old password incorrect', 401);
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
        'Password change succesfull. All your old token are now invalid. Do new login to take a valid token.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//DELETE - /users
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const connection = await getConnection();

    // Delete image if exists!
    const [
      current
    ] = await connection.query(
      'SELECT id, avatar,email from users where id=?',
      [req.auth.id]
    );

    if (!current.length) {
      const error = new Error(`There is no user with id ${id}`);
      error.httpCode = 400;
      throw error;
    }

    // Check if auth user is the same as :id or is admin
    if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('No permission to edit this user', 401);
    }

    if (current[0].avatar) {
      await deletePhoto(current[0].avatar);
    }

    await connection.query(`SET FOREIGN_KEY_CHECKS = 0;`);

    //ELIMINAR INCIDENCIAS DE LAS RESERVAS QUE SON ESPACIOS DEL USER
    await connection.query(
      `
    delete from incidents where reserve_id =
    (select id from reserves where space_id in (
      select id from spaces where owner_id = ?)
          );`,
      [req.auth.id]
    );

    //ELIMINAR VOTOS DEL USUARIO
    await connection.query(
      `
      delete from ratings where user_id = ?
     `,
      [req.auth.id]
    );

    //ELIMINAR RESERVAS DEL ESPACIO DEL USER
    await connection.query(
      `delete from reserves where space_id in (
      select id from spaces where owner_id = ?);`,
      [req.auth.id]
    );

    //ELIMINAR ESPACIOS DEL USER
    await connection.query(`delete from spaces where owner_id = ?;`, [
      req.auth.id
    ]);

    //PONEMOS EL USER A ACTIVE 0
    await connection.query('UPDATE users SET active=0 WHERE  id=?', [
      req.auth.id
    ]);

    await connection.query(`SET FOREIGN_KEY_CHECKS = 1;`);

    connection.release();

    res.send({
      status: 'ok',
      message: `The entry with id ${id} has been deleted`
    });
  } catch (error) {
    next(error);
  }
}

// GET - /comunidades
async function getComunidades(req, res, next) {
  try {
    const connection = await getConnection();

    let result;

    result = await connection.query(`SELECT nombre from comunidades`);

    connection.release();
    const [comunidades] = result;
    res.send({
      status: 'ok',
      data: comunidades
    });
  } catch (error) {
    next(error);
  }
}

//GET USERS POR FECHA DE CREACION

async function getSomeUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id,  name, avatar
      FROM users 
      ORDER BY create_user
      LIMIT 6
    `
    );

    res.send({
      status: 'ok',
      data: result
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  newUser,
  loginUser,
  getUser,
  editUser,
  updatePasswordUser,
  validateUser,
  deleteUser,
  getComunidades,
  getSomeUsers
};
