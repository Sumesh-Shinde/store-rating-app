// pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful. Please log in.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
