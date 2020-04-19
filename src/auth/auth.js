const jwt = require('jsonwebtoken')
const HttpResponse = require('../utils/httpResponse')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return new HttpResponse(res).unauthorizedError({ message: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return new HttpResponse(res).unauthorizedError({ message: 'Token malformatted' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return new HttpResponse(res).unauthorizedError({ message: 'Token malformatted' })
  }

  jwt.verify(token, process.env.TOKEN || '', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return new HttpResponse(res).unauthorizedError({ message: 'Token expired' })
      }
      return new HttpResponse(res).unauthorizedError({ message: 'Invalid Token' })
    }
    req.userId = decoded.id
    return next()
  })
}

module.exports = auth
