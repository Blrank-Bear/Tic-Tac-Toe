const mysql = require('mysql2/promise');
// Create a connection to the database
const pool = mysql.createPool({
  host: '192.168.137.23', // Your database host
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'rjh', // Your MySQL database name,
});

module.exports = pool;

