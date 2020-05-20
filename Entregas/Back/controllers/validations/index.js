const Joi = require('@hapi/joi');

const { generateError } = require('../../helpers');

// Basic Schemas
const searchSchema = Joi.string()
  .min(2)
  .required()
  .error(generateError('Search must be more than 2 characters', 400));

const nameSchema = Joi.string()
  .required()
  .max(100)
  .error(generateError('Name required and max 255 characters', 400));

const nicknameSchema = Joi.string()
  .min(5)
  .max(30)
  .required()
  .error(
    generateError('Nickname need at least 5 characters and is required', 400)
  );

const emailSchema = Joi.string()
  .email()
  .required()
  .max(60)
  .error(generateError('Email must be well formed', 400));

const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(generateError('Password need at least 6 characters and max 100', 400));

const userSchemaRegister = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  nickname: nicknameSchema
});

const userSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema
});

const editUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .error(generateError('Email must be well formed', 400)),
  name: Joi.string()
    .max(255)
    .error(generateError('Name required and max 255 characters', 400)),
  nickname: Joi.string()
    .min(5)
    .error(
      generateError('Nickname need at least 5 characters and is required', 400)
    ),
  city: Joi.string()
    .max(60)
    .error(generateError('City is required and max 60 characters', 400)),
  community: Joi.string()
    .max(60)
    .error(generateError('Community is required and max 60 characters', 400)),
  phone: Joi.string()
    .max(15)
    .error(generateError('Phone has max 15 characters', 400))
});

const editPasswordUserSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  newPasswordRepeat: Joi.any()
    .valid(Joi.ref('newPassword'))
    .error(generateError('Passwords dont match', 400))
});

// Object Schemas
const entrySchema = Joi.object().keys({
  name: Joi.string()
    .max(100)
    .required()
    .error(
      generateError('The space name is required and max 100 characters', 400)
    ),
  description: Joi.string()
    .max(1000)
    .required()
    .error(
      generateError(
        'The space description is required and max 1000 characters',
        400
      )
    ),
  city: Joi.string()
    .max(60)
    .required()
    .error(generateError('City is required and max 60 characters', 400)),
  community: Joi.string()
    .max(60)
    .required()
    .error(generateError('Community is required and max 60 characters', 400)),

  adress: Joi.string()
    .max(255)
    .required()
    .error(generateError('Adress is required and max 255 characters', 400)),
  price: Joi.number()
    .min(1)
    .required()
    .error(generateError('Price is required ', 400)),

  type: Joi.string()
    .max(30)
    .required()
    .error(generateError('Type is required and max 30 characters', 400)),

  number: Joi.number().required().error(generateError('Number is required')),

  eq_name: Joi.string()
    .max(30)
    .required()
    .error(
      generateError('The equipment name is required and max 30 characters', 400)
    )
});

const voteSchema = Joi.object().keys({
  vote: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(generateError('Vote is required and should be between 1 y 5', 400))
});

module.exports = {
  entrySchema,
  voteSchema,
  searchSchema,
  userSchema,
  editUserSchema,
  editPasswordUserSchema,
  userSchemaRegister
};
