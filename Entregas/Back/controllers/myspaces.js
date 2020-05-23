const { getConnection } = require('../db');

async function listMySpaces(req, res, next) {
  try {
    const connection = await getConnection();

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
    select i.comment from incidents i,reserves r
    where r.id = i.reserve_id
    and r.user_id = ?`,
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
  }
}

module.exports = {
  listMySpaces
};
