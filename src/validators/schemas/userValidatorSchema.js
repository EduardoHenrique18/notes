const Joi = require('@hapi/joi')

const userValidatorSchema = Joi.object({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

module.exports = userValidatorSchema
