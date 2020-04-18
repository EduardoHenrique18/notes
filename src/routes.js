const express = require('express')
const authMiddleware = require('./auth/auth')
const userController = require('./controllers/userController')
const userValidator = require('./validators/userValidator')
const noteController = require('./controllers/noteController')
const noteValidator = require('./validators/noteValidator')

const routes = express.Router()

routes.route('/login')
  .post(userValidator, userController.login)

routes.route('/user')
  .post(userValidator, userController.addUser)

routes.route('/note')
  .post(authMiddleware, noteValidator.addNoteValidator, noteController.addNote)

routes.route('/note/:userId')
  .get(authMiddleware, noteValidator.searchNoteByUserId, noteController.findNoteByUserId)

routes.route('/note/:id')
  .delete(authMiddleware, noteValidator.deleteNoteByIdSchema, noteController.deleteNoteById)
  .put(authMiddleware, noteValidator.updateNoteByIdSchema, noteController.updateNoteById)

module.exports = routes
