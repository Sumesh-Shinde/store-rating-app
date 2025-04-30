// pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      // Redirect by role
      if (res.data.role === 'admin') navigate('/admin');
      else if (res.data.role === 'normal') navigate('/user');
      else if (res.data.role === 'storeowner') navigate('/owner');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
