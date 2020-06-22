const { getConnection } = require('../db');

const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
  generateError,
  sendEmail,
  randomString
} = require('../helpers');

const {
  entrySchema,
  voteSchema,
  searchSchema,
  editEntrySchema
} = require('./validations');

// GET - /spaces
async function listSpaces(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { search, filter } = req.query;

    let result;

    if (search && filter === 'name') {
      await searchSchema.validateAsync(search);
      result = await connection.query(
        `select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where s.name like ?  and ((r.end_date is null and r.start_date is null) or r.end_date < UTC_TIMESTAMP)
        group by s.id
        order by s.create_space desc
        `,
        [`%${search}%`]
      );
    } else if (search && filter === 'location') {
      await searchSchema.validateAsync(search);
      result = await connection.query(
        `select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where (s.city like ? or s.community like ?)  and ((r.end_date is null and r.start_date is null) or r.end_date < UTC_TIMESTAMP)
        group by s.id
        order by s.create_space desc
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else if (search && filter === 'type') {
      await searchSchema.validateAsync(search);
      result = await connection.query(
        `select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where s.type like ?  and ((r.end_date is null and r.start_date is null) or r.end_date < UTC_TIMESTAMP)
        group by s.id
        order by s.create_space desc
        `,
        [`%${search}%`]
      );
    } else if (search && filter === 'equipment') {
      await searchSchema.validateAsync(search);
      result = await connection.query(
        `select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where s.equipment like ?  and ((r.end_date is null and r.start_date is null) or r.end_date < UTC_TIMESTAMP)
        group by s.id
        order by s.create_space desc
        `,
        [`%${search}%`]
      );
    } else if (search && filter === 'date') {
      await searchSchema.validateAsync(search);
      result = await connection.query(
        `
        select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where (r.end_date is null and r.start_date is null) or r.end_date < ?
        group by s.id
        order by s.create_space desc`,
        [formatDateToDB(new Date(search))]
      );
    } else {
      result = await connection.query(
        `select s.* , avg(rt.score) as score from spaces s
        left join reserves r
        on  s.id=r.space_id
        join ratings rt
        on rt.space_id=s.id
        where r.end_date is null and r.start_date is null or r.end_date < UTC_TIMESTAMP
        group by s.id
        order by s.create_space desc
        `
      );
    }
    if (!result) {
      throw generateError('Not results', 400);
    }
    const [entries] = result;

    connection.release();

    res.send({
      status: 'ok',
      data: entries
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// POST - /spaces
async function newSpace(req, res, next) {
  //Meterlos en la base de datos
  let connection;
  try {
    await entrySchema.validateAsync(req.body);

    const {
      name,
      city,
      community,
      equipment,
      adress,
      description,
      type,
      price
    } = req.body;

    let savedFileName1;
    let savedFileName2;
    let savedFileName3;

    if (req.files && req.files.photo1) {
      try {
        savedFileName1 = await processAndSavePhoto(req.files.photo1);
      } catch (error) {
        const imageError = new Error(
          'Can not process upload image 1. Try again.'
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }

    if (req.files && req.files.photo2) {
      try {
        savedFileName2 = await processAndSavePhoto(req.files.photo2);
      } catch (error) {
        const imageError = new Error(
          'Can not process upload image 2. Try again.'
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }

    if (req.files && req.files.photo3) {
      try {
        savedFileName3 = await processAndSavePhoto(req.files.photo3);
      } catch (error) {
        const imageError = new Error(
          'Can not process upload image 3. Try again.'
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      `INSERT INTO spaces(name,city,community,adress,description,photo1,photo2,photo3,type,price,owner_id,equipment) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        city,
        community,
        adress,
        description,
        savedFileName1,
        savedFileName2,
        savedFileName3,
        type,
        price,
        req.auth.id,
        equipment
      ]
    );

    connection.release();
    res.send({
      status: 'ok',
      data: {
        id: result.insertId,
        name,
        city,
        community,
        adress,
        description,
        equipment,
        savedFileName1,
        savedFileName2,
        savedFileName3,
        type,
        price,
        owner_id: req.auth.id
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// PUT - /spaces/:id
async function editSpace(req, res, next) {
  let connection;
  try {
    const { name, description, type, price, equipment } = req.body;
    const { id } = req.params;

    await editEntrySchema.validateAsync(req.body);

    connection = await getConnection();

    const [
      current
    ] = await connection.query(
      'SELECT photo1,photo2,photo3, owner_id FROM spaces WHERE id=?',
      [id]
    );

    if (!current.length) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    // Check if the authenticated user is the entry author or admin
    if (current[0].owner_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('Access denied', 401);
    }

    let savedFileName1;
    let savedFileName2;
    let savedFileName3;

    if (req.files && req.files.photo1) {
      try {
        savedFileName1 = await processAndSavePhoto(req.files.photo1);

        if (current && current.photo1) {
          await deletePhoto(current.photo1);
        }
      } catch (error) {
        throw generateError('Can not process upload image 1. Try again.', 400);
      }
    } else {
      savedFileName1 = current.photo1;
    }

    if (req.files && req.files.photo2) {
      try {
        savedFileName2 = await processAndSavePhoto(req.files.photo2);

        if (current && current.photo2) {
          await deletePhoto(current.photo2);
        }
      } catch (error) {
        throw generateError('Can not process upload image 2. Try again.', 400);
      }
    } else {
      savedFileName2 = current.photo2;
    }

    if (req.files && req.files.photo3) {
      try {
        savedFileName3 = await processAndSavePhoto(req.files.photo3);

        if (current && current.photo3) {
          await deletePhoto(current.photo1);
        }
      } catch (error) {
        throw generateError('Can not process upload image 3. Try again.', 400);
      }
    } else {
      savedFileName3 = current.photo3;
    }

    if (name) {
      await connection.query('UPDATE spaces SET name=?  WHERE id=?', [
        name,
        id
      ]);
    }

    if (description) {
      await connection.query('UPDATE spaces SET description=?  WHERE id=?', [
        description,
        id
      ]);
    }

    if (type) {
      await connection.query('UPDATE spaces SET type=? WHERE id=?', [type, id]);
    }

    if (price) {
      await connection.query('UPDATE spaces SET price=? WHERE id=?', [
        price,
        id
      ]);
    }

    if (equipment) {
      await connection.query('UPDATE spaces SET equipment=?  WHERE id=?', [
        equipment,
        id
      ]);
    }

    if (req.files && req.files.photo1) {
      await connection.query(
        `
      UPDATE spaces SET photo1=? WHERE id=?`,
        [savedFileName1, id]
      );
    }

    if (req.files && req.files.photo2) {
      await connection.query(
        `
      UPDATE spaces SET photo1=? WHERE id=?`,
        [savedFileName2, id]
      );
    }

    if (req.files && req.files.photo3) {
      await connection.query(
        `
      UPDATE spaces SET photo1=? WHERE id=?`,
        [savedFileName3, id]
      );
    }

    connection.release();

    res.send({
      status: 'ok',
      data: {
        id,
        name,
        description,
        type,
        price,
        equipment
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// GET - /spaces/:id
async function getSpace(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT s.*, avg(r.score) as score
      FROM spaces s
      left join ratings r
      on s.id=r.space_id
      where s.id = ?
      group by s.id
      ORDER BY create_space DESC`,
      [id]
    );

    if (!result[0].id) {
      throw generateError(`The entry with id ${id} does not exist`, 404);
    }

    connection.release();

    res.send({
      status: 'ok',
      data: result[0]
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// DELETE - /spaces/:id
async function deleteSpace(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    // Delete image if exists!
    const [
      current
    ] = await connection.query(
      'SELECT photo1,photo2,photo3 from diary where id=?',
      [id]
    );

    if (!current[0].length) {
      throw generateError(`There is no entry with id ${id}`, 400);
    }

    if (current[0].photo1) {
      await deletePhoto(current[0].photo1);
    }
    if (current[0].photo2) {
      await deletePhoto(current[0].photo2);
    }
    if (current[0].photo3) {
      await deletePhoto(current[0].photo3);
    }

    await connection.query(
      `delete from reserves where space_id =(
      select id from spaces where owner_id = ?)`,
      [id]
    );

    await connection.query(
      `delete from incidents where reserve_id =
    (select id from reserves where space_id =?)`,
      [id]
    );

    await connection.query(`delete from reserves where space_id =?`, [id]);

    await connection.query(`delete from ratings where space_id =?`, [id]);

    await connection.query(`delete from spaces where id = ?`, [id]);

    connection.release();

    res.send({
      status: 'ok',
      message: `The entry with id ${id} has been deleted`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// POST - /spaces/:id/votes
async function voteSpaces(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    // Validate payload
    await voteSchema.validateAsync(req.body);

    const { score, comment } = req.body;

    connection = await getConnection();

    // Check if the entry actually exists
    const [entry] = await connection.query('SELECT id from spaces where id=?', [
      id
    ]);

    if (!entry.length) {
      throw generateError(`No found space with id ${id}`, 404);
    }

    // Check if the user with the current ID already voted for this entry
    const [
      existingVote
    ] = await connection.query(
      'SELECT id from ratings where space_id=? AND user_id=?',
      [id, req.auth.id]
    );

    if (existingVote.length) {
      throw generateError('You have already voted', 403);
    }

    //Vote
    await connection.query(
      `
      INSERT INTO ratings(space_id, score, comment, user_id) 
      VALUES(?, ?, ?, ?)`,
      [id, score, comment, req.auth.id]
    );

    connection.release();

    res.send({
      status: 'ok',
      message: `The vote (${score} points) to the entry with id ${id} was successful`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//GET - /spaces/:id/votes
async function getSpaceVotes(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    const connection = await getConnection();

    const [votes] = await connection.query(
      `
      SELECT r.*,u.name,u.nickname from ratings r
        inner join users u
        on u.id=r.user_id
        WHERE space_id=?`,
      [id]
    );

    connection.release();

    res.send({
      status: 'ok',
      data: votes
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function validateReserve(req, res, next) {
  let connection;
  try {
    const { code } = req.query;
    connection = await getConnection();
    const [
      result
    ] = await connection.query(
      'UPDATE reserves SET is_confirmed=1,confirmationCode=NULL WHERE confirmationCode=?',
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError('Invalid validation', 400);
    }

    res.send({
      status: 'ok',
      message: 'Reserve was successfull, now you can pay at my coworking'
    });

    connection.release();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function reserveSpace(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    //id=space_id
    const { id } = req.params;
    const { start, end } = req.body;
    const reserveCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/spaces/validate?code=${reserveCode}`;

    const [
      email
    ] = await connection.query(`Select email from users where id = ?`, [
      req.auth.id
    ]);

    try {
      await sendEmail({
        email: email,
        title: 'Validate your reserve of coworkings app',
        content: `To validate your reserve clic on link or copy and then paste on your browser: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error sending email. Try again later.');
    }

    await connection.query(
      `INSERT INTO reserves (confirmationCode,user_id,space_id,start_date,end_date)
      VALUES(?,?,?,?,?)
    `,
      [
        reserveCode,
        req.auth.id,
        id,
        formatDateToDB(new Date(start)),
        formatDateToDB(new Date(end))
      ]
    );

    res.send({
      staus: 'ok',
      message:
        'Reserve done. Check your email to activate (the email is maybe at spam).'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listSpaces,
  newSpace,
  getSpace,
  deleteSpace,
  editSpace,
  voteSpaces,
  getSpaceVotes,
  validateReserve,
  reserveSpace
};
