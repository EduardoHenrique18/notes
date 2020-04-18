const noteValidatorSchema = require('./schemas/noteValidatorSchema')

const addNoteValidator = async (req, res, next) => {
  const { name, description } = req.body
  try {
    await noteValidatorSchema.addNoteValidatorSchema.validateAsync({
      name,
      description
    })

    return next()
  } catch (err) {
    return res.status(400).send({ error: 'Invalid request' })
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
    return res.status(400).send({ error: 'Invalid request' })
  }
}

const deleteNoteByIdSchema = async (req, res, next) => {
  const { id } = req.params
  try {
    await noteValidatorSchema.deleteNoteByIdSchema.validateAsync({ id })

    return next()
  } catch (err) {
    return res.status(400).send({ error: 'Invalid request' })
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
    return res.status(400).send({ error: 'Invalid request' })
  }
}

module.exports = {
  addNoteValidator,
  searchNoteByUserId,
  deleteNoteByIdSchema,
  updateNoteByIdSchema
}
