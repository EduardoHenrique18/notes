const noteModel = require('../models/noteModel')
const HttpResponse = require('../utils/httpResponse')
const { NoteDontExistError } = require('../utils/errors')

const addNote = async (req, res) => {
  const { title, description, userId } = req.body
  try {
    const createdNote = await noteModel.create({ title, description, userId })

    return new HttpResponse(res).ok({ createdNote })
  } catch (error) {
    console.log(error)
    return new HttpResponse(res).serverError()
  }
}

const findNoteByUserId = async (req, res) => {
  const { userId } = req.params
  try {
    const notes = await noteModel.find({ userId })

    return new HttpResponse(res).ok({ notes })
  } catch (error) {
    console.log(error)
    return new HttpResponse(res).serverError()
  }
}

const deleteNoteById = async (req, res) => {
  const { id } = req.params
  try {
    const noteDeleted = await noteModel.findByIdAndDelete({ _id: id })

    if (noteDeleted) {
      return new HttpResponse(res).ok({ message: 'note deleted successfully' })
    }

    return new HttpResponse(res).badRequest(new NoteDontExistError())
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      return new HttpResponse(res).badRequest(new NoteDontExistError())
    }
    return new HttpResponse(res).serverError()
  }
}

const updateNoteById = async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body
  try {
    const noteUpdated = await noteModel.findByIdAndUpdate(id, { title, description })

    if (noteUpdated) {
      return new HttpResponse(res).ok({ message: 'note updated successfully' })
    }

    return new HttpResponse(res).badRequest(new NoteDontExistError())
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      return new HttpResponse(res).badRequest(new NoteDontExistError())
    }
    return new HttpResponse(res).serverError()
  }
}

module.exports = {
  addNote,
  findNoteByUserId,
  deleteNoteById,
  updateNoteById
}
