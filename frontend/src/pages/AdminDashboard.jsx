import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', address: '', role: 'normal' });
  const [storeForm, setStoreForm] = useState({ name: '', email: '', address: '' });
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const handleStoreChange = (e) => setStoreForm({ ...storeForm, [e.target.name]: e.target.value });

  const submitUser = async () => {
    try {
      await API.post('/admin/add-user', userForm);
      alert('User added');
    } catch (err) {
      alert(err.response?.data?.message || 'User add failed');
    }
  };

  const submitStore = async () => {
    try {
      await API.post('/admin/add-store', storeForm);
      alert('Store added');
    } catch (err) {
      alert(err.response?.data?.message || 'Store add failed');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/dashboard');
      setStats(res.data);
    } catch (err) {
      alert('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <h3>Dashboard Stats</h3>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <h3>Add New User</h3>
      <input name="name" placeholder="Name" onChange={handleUserChange} /><br />
      <input name="email" placeholder="Email" onChange={handleUserChange} /><br />
      <input name="password" placeholder="Password" onChange={handleUserChange} /><br />
      <input name="address" placeholder="Address" onChange={handleUserChange} /><br />
      <select name="role" onChange={handleUserChange}>
        <option value="normal">Normal</option>
        <option value="admin">Admin</option>
      </select><br />
      <button onClick={submitUser}>Add User</button>

      <h3>Add New Store</h3>
      <input name="name" placeholder="Store Name" onChange={handleStoreChange} /><br />
      <input name="email" placeholder="Store Email" onChange={handleStoreChange} /><br />
      <input name="address" placeholder="Address" onChange={handleStoreChange} /><br />
      <button onClick={submitStore}>Add Store</button>
    </div>
  );
};

export default AdminDashboard;
