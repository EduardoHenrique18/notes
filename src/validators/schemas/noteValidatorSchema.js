const Joi = require('@hapi/joi')

const addNoteValidatorSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum().min(3).max(50).required()
})

const searchNoteByUserIdSchema = Joi.object({
  userId: Joi.string().alphanum().length(24).required()
})

const deleteNoteByIdSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required()
})

const updateNoteByIdSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum().min(3).max(50).required(),
  id: Joi.string().alphanum().length(24).required()
})

module.exports = {
  addNoteValidatorSchema,
  searchNoteByUserIdSchema,
  deleteNoteByIdSchema,
  updateNoteByIdSchema
}
