import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/register', { name, gender, dob, email, password });
      alert('Registration successful!');
      // Redirect to login
      window.location.href = '/login';
    } catch (error: any) {
      alert('Registration failed: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;