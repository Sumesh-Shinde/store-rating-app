const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Submit or update rating
router.post('/', authMiddleware, authorizeRoles('normal'), submitRating);

module.exports = router;
