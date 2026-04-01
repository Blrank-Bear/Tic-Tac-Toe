const pool = require('../service/Pool.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { name, gender, dob, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, gender, dob, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, gender, dob, email, hashedPassword]
    );
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    // console.log( result[0]);
    // return ;
    const user = result[0];
    
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};