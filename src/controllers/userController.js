const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const HttpResponse = require('../utils/httpResponse')
const { DataAlreadyExistError, IncorrectUserError } = require('../utils/errors')

const userModel = require('../models/userModel')

const tokenGenerator = (userId) => jwt.sign({ id: userId }, process.env.TOKEN || '', {
  expiresIn: 10800
})

const addUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await userModel.findOne({ userName })

    if (user) {
      return new HttpResponse(res).conflictError(new DataAlreadyExistError())
    }

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({ userName, password: hash })

    createdUser.password = undefined

    return new HttpResponse(res).ok({ createdUser, token: tokenGenerator(createdUser._id) })
  } catch (error) {
    console.log(error)
    return new HttpResponse(res).serverError()
  }
}

const login = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await userModel.findOne({ userName })

    if (!user) {
      return new HttpResponse(res).unauthorizedError(new IncorrectUserError())
    }

    if (!await bcrypt.compare(password, user.password)) {
      return new HttpResponse(res).unauthorizedError(new IncorrectUserError())
    }

    user.password = undefined

    return new HttpResponse(res).ok({ user, token: tokenGenerator(user._id) })
  } catch (error) {
    console.log(error)
    return new HttpResponse(res).serverError()
  }
}

module.exports = {
  addUser,
  login
}
