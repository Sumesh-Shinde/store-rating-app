const express = require('express');
const { getStoreRatings, getAverageRating } = require('../controllers/storeOwnerController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Store owner routes
router.get('/ratings', authMiddleware, authorizeRoles('storeowner'), getStoreRatings);
router.get('/average-rating', authMiddleware, authorizeRoles('storeowner'), getAverageRating);

module.exports = router;
