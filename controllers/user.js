const conn = require('../utils/connect')

const getUser = (data) => {
  const sql = 'select id, password from users where name=? limit 1'
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

const addUser = (data) => {
  const sql = 'insert into users (name, password) values (?, ?)'
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
  getUser,
  addUser
}
