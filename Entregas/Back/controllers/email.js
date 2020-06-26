const { sendEmail } = require('../helpers');

async function contactEmail(req, res, next) {
  try {
    const { email, comentary, asunto } = req.body;
    await sendEmail({
      email: email,
      title: asunto,
      content: comentary
    });
    res.send({
      status: 'ok',
      message: `The entry email was sent`
    });
  } catch (error) {
    console.error(error.response.body);
    throw new Error('Error sending email. Try again later.');
  }
}
module.exports = {
  contactEmail
};
