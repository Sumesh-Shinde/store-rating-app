import React, { useEffect, useState } from 'react';
import API from '../services/api';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState('');

  console.log('Fetching stores...');

  const fetchStores = async () => {
    try {
      const res = await API.get('/stores/all');
      setStores(res.data);
      setFilteredStores(res.data);
    } catch (err) {
        console.error('Store fetch failed:', err.response?.data || err.message);

      alert('Failed to load stores');
    }
  };

  const handleRating = async (storeId, rating) => {
    if (rating < 1 || rating > 5) return alert('Rating must be between 1 and 5');
    try {
      await API.post('/ratings', { storeId, rating });
      fetchStores();
    } catch (err) {
      alert('Failed to submit rating');
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(value.toLowerCase()) ||
      store.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <input
        type="text"
        placeholder="Search store by name or address"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredStores.map(store => (
        <div key={store.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h4>{store.name}</h4>
          <p><strong>Address:</strong> {store.address}</p>
          <p><strong>Average Rating:</strong> {store.average_rating || 'N/A'}</p>
          <p><strong>Your Rating:</strong> {store.user_rating || 'Not Rated'}</p>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate 1-5"
            onBlur={(e) => handleRating(store.id, parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
