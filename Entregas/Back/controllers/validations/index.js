const Joi = require('@hapi/joi');

const { generateError } = require('../../helpers');

// Basic Schemas
const searchSchema = Joi.string()
  .min(2)
  .required()
  .error(
    generateError(
      'El campo de búsqueda debe de ser de máis de 2 caracteres',
      400
    )
  );

const nameSchema = Joi.string()
  .required()
  .max(100)
  .error(
    generateError(
      'El nombre no puede pasar de 100 caracteres y es requerido',
      400
    )
  );

const nicknameSchema = Joi.string()
  .min(5)
  .max(30)
  .required()
  .error(
    generateError(
      'El campo nickname debe de ser de más de 5 caracteres y es requerido',
      400
    )
  );

const emailSchema = Joi.string()
  .email()
  .required()
  .max(60)
  .error(generateError('El campo email debe ser un email bien formado', 400));

const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(
    generateError('La password debe de tener entre 6 y 100 carateres', 400)
  );

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
    .error(generateError('El campo email debe ser un email bien formado', 400)),
  name: Joi.string()
    .max(255)
    .error(
      generateError(
        'El nombre no puede pasar de 255 caracteres y es requerido',
        400
      )
    ),
  nickname: Joi.string()
    .min(5)
    .error(
      generateError(
        'El campo nickname debe de ser de más de 5 caracteres y es requerido',
        400
      )
    ),
  city: Joi.string()
    .max(60)
    .error(
      generateError('El nombre real no puede pasar de 60 caracteres', 400)
    ),
  community: Joi.string()
    .max(60)
    .error(
      generateError('El nombre real no puede pasar de 60 caracteres', 400)
    ),
  phone: Joi.string()
    .max(15)
    .error(generateError('El nombre real no puede pasar de 15 caracteres', 400))
});

const editPasswordUserSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  newPasswordRepeat: Joi.any()
    .valid(Joi.ref('newPassword'))
    .error(generateError('Las passwords debe ser iguales', 400))
});

// Object Schemas
const entrySchema = Joi.object().keys({
  name: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        'El campo place es obligatorio y no puede tener más de 100 caracteres',
        400
      )
    ),
  description: Joi.string()
    .max(1000)
    .required()
    .error(
      generateError(
        'El campo description es obligatorio y non puede tener más de 1000 caracteres',
        400
      )
    ),
  city: Joi.string()
    .max(60)
    .required()
    .error(
      generateError('El nombre real no puede pasar de 60 caracteres', 400)
    ),
  community: Joi.string()
    .max(60)
    .required()
    .error(
      generateError('El nombre real no puede pasar de 60 caracteres', 400)
    ),

  adress: Joi.string()
    .max(255)
    .required()
    .error(
      generateError(
        'El campo adress es obligatorio y non puede tener más de 255 caracteres',
        400
      )
    ),
  price: Joi.number()
    .min(1)
    .required()
    .error(generateError('El campo precio debe existir ', 400))
});

const voteSchema = Joi.object().keys({
  vote: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(
      generateError(
        'El campo voto debe existir y ser un número entre 1 y 5',
        400
      )
    )
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
