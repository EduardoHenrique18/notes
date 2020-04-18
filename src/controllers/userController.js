const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')

const tokenGenerator = (userId) => jwt.sign({ id: userId }, process.env.TOKEN || '3c1b3d790e3320bd76eb04b83737e3b4', {
  expiresIn: 10800
})

const addUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await userModel.findOne({ userName })

    if (user) {
      return res.status(400).send({ error: 'User already exist' })
    }

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({ userName, password: hash })

    createdUser.password = undefined

    return res.send({ createdUser, token: tokenGenerator(createdUser._id) })
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' })
  }
}

const login = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await userModel.findOne({ userName })

    if (!user) {
      return res.status(400).send({ error: 'User not found' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined

    return res.send({ user, token: tokenGenerator(user.id) })
  } catch (error) {
    return res.status(400).send({ error: 'login failed' })
  }
}

module.exports = {
  addUser,
  login
}
