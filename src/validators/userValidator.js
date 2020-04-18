const userValidatorSchema = require('./schemas/userValidatorSchema')

const userValidator = async (req, res, next) => {
  const { userName, password } = req.body
  try {
    await userValidatorSchema.validateAsync({ userName, password })

    return next()
  } catch (err) {
    return res.status(400).send({ error: 'Invalid request' })
  }
}

module.exports = userValidator
