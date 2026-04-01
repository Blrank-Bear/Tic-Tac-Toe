const mysql = require('mysql2/promise');
// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root', // Your MySQL username
  password: '1111', // Your MySQL password
  database: 'tic-tac-toe' // Your MySQL database name
});

module.exports = pool;

