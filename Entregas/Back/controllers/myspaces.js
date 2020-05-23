const { getConnection } = require('../db');

async function listMySpaces(req, res, next) {
  try {
    const connection = await getConnection();

    let result;

    result = await connection.query(
      `
      select u.name, s.*,i.* from users u,spaces s,incidents i,reserves r
      where u.id=s.owner_id and r.id=i.reserve_id
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
  listMySpaces
};
