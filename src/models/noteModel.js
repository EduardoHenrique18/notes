const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Note = model('Note', noteSchema)

module.exports = Note
