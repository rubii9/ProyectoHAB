const { getConnection } = require('../db');

async function listMyCoworking(req, res, next) {
  try {
    const connection = await getConnection();

    let result;

    result = await connection.query(
      `
    select s.* ,r.*,i.*from reserves r,incidents i, spaces s
    where r.id = i.reserve_id and r.space_id = s.id
    and user_id = ?  
    `,
      [req.auth.id]
    );
    if (!result) {
      const resultError = new Error('You have not reserves');
      resultError.httpCode = 400;
      throw resultError;
    }

    const [entries] = result;

    res.send({
      status: 'ok',
      data: entries
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listMyCoworking
};
