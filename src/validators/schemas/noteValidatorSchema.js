const Joi = require('@hapi/joi')

const addNoteValidatorSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(255).required(),
  userId: Joi.string().alphanum().length(24).required()
})

const searchNoteByUserIdSchema = Joi.object({
  userId: Joi.string().alphanum().length(24).required()
})

const deleteNoteByIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required()
})

const updateNoteByIdSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(255).required(),
  id: Joi.string().alphanum().length(24).required()
})

module.exports = {
  addNoteValidatorSchema,
  searchNoteByUserIdSchema,
  deleteNoteByIdSchema,
  updateNoteByIdSchema
}
