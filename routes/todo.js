const router = require('express').Router()
const Todo = require('../controllers/todo')
const {verify} = require('../utils/auth')

router.use('*', verify)

router.get('/', (req, res) => {
  const data = [req.userId]
  Todo.getTodo(data)
    .then((result) => res.send(result))
    .catch(() => res.sendStatus(500))
})

router.post('/insert', (req, res) => {
  const data = [
    req.userId,
    req.body.text
  ]
  Todo.addTodo(data)
    .then((result) => res.send({id: result.insertId}))
    .catch(() => res.sendStatus(500))
})

router.delete('/delete', (req, res) => {
  const data = [req.body.id]
  Todo.removeTodo(data)
    .then(() => res.send())
    .catch(() => res.sendStatus(500))
})

module.exports = router
