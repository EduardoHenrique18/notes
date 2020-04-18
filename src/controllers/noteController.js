const noteModel = require('../models/noteModel')

const addNote = async (req, res) => {
  const { name, description, userId } = req.body
  try {
    const createdNote = await noteModel.create({ name, description, userId })

    return res.send({ createdNote })
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' })
  }
}

const findNoteByUserId = async (req, res) => {
  const { userId } = req.params
  try {
    const notes = await noteModel.find({ userId })

    return res.send({ notes })
  } catch (error) {
    return res.status(400).send({ error: 'requisition failed' })
  }
}

const deleteNoteById = async (req, res) => {
  const { id } = req.params
  try {
    await noteModel.findByIdAndDelete({ _id: id })

    return res.send({ message: 'note deleted successfully' })
  } catch (error) {
    return res.status(400).send({ error: 'requisition failed' })
  }
}

const updateNoteById = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    await noteModel.findByIdAndUpdate(id, { name, description })

    return res.send({ message: 'note updated successfully' })
  } catch (error) {
    return res.status(400).send({ error: 'requisition failed' })
  }
}

module.exports = {
  addNote,
  findNoteByUserId,
  deleteNoteById,
  updateNoteById
}
