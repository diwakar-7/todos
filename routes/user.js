const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../controllers/user')

const validity = 7 * 24 * 3600
const saltRounds = 10

const generateToken = (id) => jwt.sign({
  id,
  expiresIn: validity
}, 'secret')

router.post('/signup', (req, res) => {
  const data = [req.body.username]
  User.getUser(data)
    .then((users) => {
      if (users.length === 1) {
        res.statusMessage = 'Username already registered'
        return res.sendStatus(422)
      }

      bcrypt.hash(req.body.password, saltRounds)
        .then((hash) => {
          data.push(hash)
          User.addUser(data)
            .then((result) => {
              const token = generateToken(result.insertId)
              res.cookie('jwt', token, {
                maxAge: validity * 1000,
                httpOnly: true,
                secure: false
              }).send()
            })
            .catch(() => res.sendStatus(500))
        })
        .catch(() => res.sendStatus(500))
    })
    .catch(() => res.sendStatus(500))
})

router.post('/signin', (req, res) => {
  const data = [req.body.username]

  User.getUser(data)
    .then((users) => {
      if (users.length === 0) {
        // User not signed up
        res.statusMessage = 'Invalid username or password'
        return res.sendStatus(422)
      }

      bcrypt.compare(req.body.password, users[0].password)
        .then((result) => {
          if (!result) {
        res.statusMessage = 'Invalid username or password'
        return res.sendStatus(422)
          }
          const token = generateToken(users[0].id)
          res.cookie('jwt', token, {
            maxAge: validity * 1000,
            httpOnly: true,
            secure: false
          }).send()
        })
        .catch(() => res.sendStatus(500))
    })
    .catch(() => res.sendStatus(500))
})

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').redirect('/')
})

module.exports = router
