// controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup for Normal Users
exports.signup = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    // Validate fields
    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check name length
    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: 'Name must be between 20 to 60 characters' });
    }

    if (address.length > 400) {
      return res.status(400).json({ message: 'Address is too long (max 400 characters)' });
    }

    if (password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({ message: 'Password must be 8-16 characters, include 1 uppercase and 1 special character' });
    }

    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user (role = normal)
    await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, 'normal']
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// Login for all users
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('BODY:', req.body); // Log entire body

  try {
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password required' });
    }

    console.log('Looking for user with email:', email);

    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userRows.length === 0) {
      console.log('No user found for that email');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userRows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    console.log('Login successful');
    res.json({ token, role: user.role });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
