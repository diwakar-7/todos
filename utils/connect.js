const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'account'
})

connection.connect((err) => {
  if (err) {
    throw err
  }
})

module.exports = connection
