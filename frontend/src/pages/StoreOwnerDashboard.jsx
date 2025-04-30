import React, { useEffect, useState } from 'react';
import API from '../services/api';

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(null);

  const fetchRatings = async () => {
    try {
      const res = await API.get('/storeowner/ratings');
      setRatings(res.data.ratings || []);
    } catch (err) {
      alert('Failed to fetch store ratings');
    }
  };

  const fetchAverage = async () => {
    try {
      const res = await API.get('/storeowner/average-rating');
      setAvgRating(res.data.average_rating);
    } catch (err) {
      alert('Failed to fetch average rating');
    }
  };

  useEffect(() => {
    fetchRatings();
    fetchAverage();
  }, []);

  return (
    <div className="container">
      <h2>Store Owner Dashboard</h2>

      <h3>Average Rating: {avgRating ?? 'N/A'}</h3>

      <h3>Customer Ratings:</h3>
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        ratings.map((r, i) => (
          <div key={i} className="store-card">
            <p><strong>User:</strong> {r.user_name} ({r.email})</p>
            <p><strong>Rating:</strong> {r.rating}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
