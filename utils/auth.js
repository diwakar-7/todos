const jwt = require('jsonwebtoken')

const identity = (req, res, next) => {
  const cookie = req.cookies
  if (cookie && cookie.jwt) {
    const payload = jwt.verify(cookie.jwt, 'secret')
    if (payload) {
      req.userId = payload.id
    }
  }
  next()
}

const verify = (req, res, next) => {
  if (!req.userId) {
    return res.sendStatus(401)
  }
  next()
}

module.exports = {
  identity,
  verify
}
