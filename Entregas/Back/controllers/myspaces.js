const { getConnection } = require('../db');

async function listMySpaces(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    let result;
    let incidents;
    result = await connection.query(
      `
      select u.name, s.* from users u,spaces s
      where u.id=s.owner_id 
      and s.owner_id = ?
    `,
      [req.auth.id]
    );
    if (!result) {
      const resultError = new Error(
        'You have not spaces, try tu post a new space'
      );
      resultError.httpCode = 400;
      throw resultError;
    }
    incidents = await connection.query(
      `
      select i.comment,r.space_id from incidents i,reserves r,spaces s
      where r.id = i.reserve_id and s.id=r.space_id
      and i.state="open" and s.owner_id=?
    `,
      [req.auth.id]
    );

    const [comments] = incidents;
    const [entries] = result;

    connection.release();
    res.send({
      status: 'ok',
      data: entries,
      dataIncidents: comments
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//Close incidents

async function closeIncident(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    //id del espacio
    connection = await getConnection();

    const [
      current
    ] = await connection.query('SELECT owner_id FROM spaces WHERE id=?', [id]);

    if (!current.length) {
      const error = new Error(`The space with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    if (current[0].owner_id !== req.auth.id && req.auth.role !== 'admin') {
      const error = new Error('Access denied');
      error.httpCode = 401;
      throw error;
    }

    const [comments] = await connection.query(
      `select i.comment from incidents i,reserves r
      where r.id = i.reserve_id and i.state="open" and r.space_id = ?`,
      [id]
    );

    await connection.query(`SET SQL_SAFE_UPDATES = 0`);

    await connection.query(
      `
    UPDATE incidents i
    inner join reserves r
    on i.reserve_id=r.id
    set state = "close"
    where state="open" and r.space_id = ?`,
      [id]
    );

    await connection.query(`SET SQL_SAFE_UPDATES = 1`);

    connection.release();
    res.send({
      status: 'ok',
      data: {
        id,
        comments,
        current
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//Clean Space
async function cleanSpace(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    //id del espacio
    connection = await getConnection();
    let state;
    const [
      current
    ] = await connection.query('SELECT id,owner_id FROM spaces WHERE id=?', [
      id
    ]);

    if (!current.length) {
      const error = new Error(`The space with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    if (current[0].owner_id !== req.auth.id && req.auth.role !== 'admin') {
      const error = new Error('Access denied');
      error.httpCode = 401;
      throw error;
    }

    await connection.query(
      `UPDATE reserves set is_clean = true where space_id = ?`,
      [id]
    );

    [
      state
    ] = await connection.query(
      `Select is_clean,space_id from reserves where space_id = ?`,
      [id]
    );

    connection.release();
    res.send({
      status: 'ok',
      data: {
        id,
        state
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listMySpaces,
  cleanSpace,
  closeIncident
};
