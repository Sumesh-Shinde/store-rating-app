// controllers/adminController.js
const pool = require('../config/db');

// Add new user (admin or normal user)
exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new store
exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    if (!name || !email || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await pool.query(
      'INSERT INTO stores (name, email, address) VALUES (?, ?, ?)',
      [name, email, address]
    );

    res.status(201).json({ message: 'Store added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
    const [stores] = await pool.query('SELECT COUNT(*) as totalStores FROM stores');
    const [ratings] = await pool.query('SELECT COUNT(*) as totalRatings FROM ratings');

    res.json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
