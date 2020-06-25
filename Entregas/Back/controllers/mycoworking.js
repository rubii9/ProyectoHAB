const { getConnection } = require('../db');
const { incident } = require('./validations');
const { generateError, sendEmail, randomString } = require('../helpers');

async function listMyCoworking(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    let result;
    let incedents;

    result = await connection.query(
      `
    select s.* ,r.*from reserves r, spaces s
    where r.space_id = s.id
    and r.user_id = ?  
    order by r.end_date 
    `,
      [req.auth.id]
    );
    if (!result) {
      throw generateError('You have not reserves', 400);
    }
    incedents = await connection.query(
      `
    select  i.comment,i.state,r.space_id from reserves r, incidents i
    where  i.reserve_id=r.id
    and r.user_id = ?`,
      [req.auth.id]
    );
    const [entries] = result;
    const [comments] = incedents;
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

//validate payment
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

//Pay reserve
async function payment(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    //id = space_id
    const { id } = req.params;
    const paymentCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/mycoworking/validate?code=${paymentCode}`;
    const [
      email
    ] = await connection.query(`Select email from users where id = ?`, [
      req.auth.id
    ]);

    try {
      await sendEmail({
        email: email,
        title: 'Validate your payment of coworkings app',
        content: `To validate your payment click on link or copy and then paste on your browser: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error sending email. Try again later.');
    }

    await connection.query(
      'UPDATE reserves SET paymentCode=? WHERE user_id=? and space_id = ?',
      [paymentCode, req.auth.id, id]
    );

    res.send({
      staus: 'ok',
      message:
        'Payment done. Check your email to activate (the email is maybe at spam).'
    });
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
    //id del espacio

    await incident.validateAsync(req.body);

    const { comment } = req.body;

    connection = await getConnection();

    const [
      entry
    ] = await connection.query('SELECT id from reserves where space_id= ?', [
      id
    ]);

    if (!entry.length) {
      throw generateError(`No found reserve with id ${id}`, 404);
    }

    await connection.query(
      `
    INSERT INTO incidents (comment,reserve_id) 
    VALUES(?, ?)`,
      [comment, entry[0].id]
    );

    connection.release();

    res.send({
      status: 'ok',
      message: `The new incedent to the reserve with id ${entry[0].id} and space wiht id ${id} was successful`
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
