const { getConnection } = require('../db');
const { incident } = require('./validations');
const { generateError, sendEmail, randomString } = require('../helpers');

async function listMyCoworking(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

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
      throw generateError('You have not reserves', 400);
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

//pagar la reserva
async function validatePay(req, res, next) {
  let connection;
  try {
    const { code } = req.query;
    connection = await getConnection();
    const [
      result
    ] = await connection.query(
      'UPDATE reserves SET is_paid=1,paymentCode=NULL WHERE paymentCode=?',
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError('Invalid validation', 400);
    }

    res.send({
      status: 'ok',
      message: 'Payment was successfull'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

async function payment(req, res, next) {
  let connection;
  try {
    //hacer el codigo de payment
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//crear incidencia
async function newIncident(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    await incident.validateAsync(req.body);

    const { comment } = req.body;

    connection = await getConnection();

    const [
      entry
    ] = await connection.query('SELECT id from reserves where space_id = ?', [
      id
    ]);

    if (!entry.length) {
      throw generateError(`No found space with id ${id}`, 404);
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
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  listMyCoworking,
  newIncident,
  payment,
  validatePay
};
