// routes/adminRoutes.js
const express = require('express');
const { addUser, addStore, getDashboardData } = require('../controllers/adminController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin routes (only admin can access)
router.post('/add-user', authMiddleware, authorizeRoles('admin'), addUser);
router.post('/add-store', authMiddleware, authorizeRoles('admin'), addStore);
router.get('/dashboard', authMiddleware, authorizeRoles('admin'), getDashboardData);

module.exports = router;
