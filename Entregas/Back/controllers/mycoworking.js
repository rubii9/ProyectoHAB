const { getConnection } = require('../db');
const { incident } = require('./validations');
async function listMyCoworking(req, res, next) {
  try {
    const connection = await getConnection();

    let result;

    result = await connection.query(
      `
    select s.* ,r.*from reserves r, spaces s
    where r.space_id = s.id
    and r.user_id = ?  
    `,
      [req.auth.id]
    );
    if (!result) {
      const resultError = new Error('You have not reserves');
      resultError.httpCode = 400;
      throw resultError;
    }

    const [entries] = result;
    connection.release();
    res.send({
      status: 'ok',
      data: entries
    });
  } catch (error) {
    next(error);
  }
}

//pagar la reserva
async function payment() {}

//crear incidencia
async function newIncident(req, res, next) {
  try {
    const { id } = req.params;

    await incident.validateAsync(req.body);

    const { comment } = req.body;

    const connection = await getConnection();

    const [
      entry
    ] = await connection.query('SELECT id from reserves where space_id = ?', [
      id
    ]);

    if (!entry.length) {
      const error = new Error(`No found space with id ${id}`);
      error.httpCode = 404;
      throw error;
    }

    await connection.query(
      `
    INSERT INTO incidents (comment,reserve_id) 
    VALUES(?, ?)`,
      [comment, id]
    );

    connection.release();

    res.send({
      status: 'ok',
      message: `The new incedent to the reserve with id ${id} was successful`
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listMyCoworking,
  newIncident,
  payment
};