const { sendEmail } = require('../helpers');
const { contactSchema } = require('./validations');

async function contact(req, res, next) {
  try {
    await contactSchema.validateAsync(req.body);
    const { email, comentary, asunto } = req.body;
    try {
      await sendEmail({
        email: email,
        title: asunto,
        content: comentary
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error sending email. Try again later.');
    }
    res.send({
      status: 'ok',
      message: `The entry email was sent`
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  contact
};
