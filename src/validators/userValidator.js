const userValidatorSchema = require('./schemas/userValidatorSchema')
const HttpResponse = require('../utils/httpResponse')
const { InvalidParamError } = require('../utils/errors')

const userValidator = async (req, res, next) => {
  const { userName, password } = req.body
  console.log(req.body)
  try {
    await userValidatorSchema.validateAsync({ userName, password })

    return next()
  } catch (err) {
    console.log(err)
    return new HttpResponse(res).badRequest(new InvalidParamError(err.details[0].path[0]))
  }
}

module.exports = userValidator
