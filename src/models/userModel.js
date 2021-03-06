const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
})

const User = model('User', userSchema)

module.exports = User
