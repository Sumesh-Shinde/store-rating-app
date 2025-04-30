// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('../store-rating-backend/config/db');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // your React frontend
    credentials: true
  }));
app.use(express.json());

// Middlewares
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const storeOwnerRoutes = require('./routes/storeOwnerRoutes');




app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/storeowner', storeOwnerRoutes);


app.use(cors());
app.use(express.json());

// Test API
app.get('/', (req, res) => {
    res.send('Store Rating App Backend is Running 🚀');
});

// Test DB connection
app.get('/dbtest', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1');
        res.json({ message: 'Database Connected Successfully!', rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database Connection Failed', error });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
