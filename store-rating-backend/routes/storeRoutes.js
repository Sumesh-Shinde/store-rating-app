const express = require('express');
const { getAllStores } = require('../controllers/storeController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Only normal users can access
router.get('/all', authMiddleware, authorizeRoles('normal'), getAllStores);

module.exports = router;
