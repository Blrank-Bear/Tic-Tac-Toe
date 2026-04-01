const mysql = require('mysql2/promise');
// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'tic-tac-toe', // Your MySQL database name,
  port: 3306
});

module.exports = pool;

