const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' })
  }

  jwt.verify(token, process.env.TOKEN || '3c1b3d790e3320bd76eb04b83737e3b4', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(504).send({ error: 'Token expired' })
      }
      return res.status(401).send({ error: 'Token invalid' })
    }
    req.userId = decoded.id
    return next()
  })
}

module.exports = auth
