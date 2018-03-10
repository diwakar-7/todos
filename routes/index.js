const router = require('express').Router()
const config = require('../config.js')

router.get('/', (req, res) => {
  if (req.userId) {
    res.sendFile('todo.html', config)
  } else {
    res.sendFile('index.html', config)
  }
})

module.exports = router
