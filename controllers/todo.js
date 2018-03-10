const conn = require('../utils/connect')

const getTodo = (data) => {
  const sql = 'select id, text from todos where userId=?'
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const addTodo = (data) => {
  const sql = 'insert into todos (userId, text) values (?, ?)'
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const removeTodo = (data) => {
  const sql = 'delete from todos where id=?'
  return new Promise((resolve, reject) => {
    conn.query(sql, data, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getTodo,
  addTodo,
  removeTodo
}
