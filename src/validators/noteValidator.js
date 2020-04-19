const noteValidatorSchema = require('./schemas/noteValidatorSchema')
const HttpResponse = require('../utils/httpResponse')
const { InvalidParamError } = require('../utils/errors')

const addNoteValidator = async (req, res, next) => {
  const { name, description, userId } = req.body
  try {
    await noteValidatorSchema.addNoteValidatorSchema.validateAsync({
      name,
      description,
      userId
    })

    return next()
  } catch (err) {
    return new HttpResponse(res).badRequest(new InvalidParamError(err.details[0].path[0]))
  }
}

const searchNoteByUserId = async (req, res, next) => {
  const { userId } = req.params
  try {
    await noteValidatorSchema.searchNoteByUserIdSchema.validateAsync({
      userId
    })

    return next()
  } catch (err) {
    return new HttpResponse(res).badRequest(new InvalidParamError(err.details[0].path[0]))
  }
}

const deleteNoteByIdSchema = async (req, res, next) => {
  const { id } = req.params
  try {
    await noteValidatorSchema.deleteNoteByIdSchema.validateAsync({ id })

    return next()
  } catch (err) {
    return new HttpResponse(res).badRequest(new InvalidParamError(err.details[0].path[0]))
  }
}

const updateNoteByIdSchema = async (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    await noteValidatorSchema.updateNoteByIdSchema.validateAsync({
      id,
      name,
      description
    })

    return next()
  } catch (err) {
    return new HttpResponse(res).badRequest(new InvalidParamError(err.details[0].path[0]))
  }
}

module.exports = {
  addNoteValidator,
  searchNoteByUserId,
  deleteNoteByIdSchema,
  updateNoteByIdSchema
}
