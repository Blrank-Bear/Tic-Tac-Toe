import React, { useState } from 'react';
import axios from 'axios';
import './css/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { email, password });
      console.log(response.data.user.id);
      localStorage.setItem('user_id', response.data.user.id);
      alert('Login successful!');
      // Redirect to game room list
      window.location.href = '/rooms';
    } catch (error: any) {
      alert('Login failed: ' + error.response.data.error);
    }
  };

  return (
    <div className='main'>
      <form onSubmit={handleLogin} className='form-pannel'>
        <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className='input' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;