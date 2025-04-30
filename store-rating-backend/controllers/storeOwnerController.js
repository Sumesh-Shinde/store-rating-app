// controllers/storeOwnerController.js
const pool = require('../config/db');

// Get all users who rated this store owner's store
exports.getStoreRatings = async (req, res) => {
  const ownerId = req.user.id;

  try {
    // First, get the store owned by this user
    const [storeRows] = await pool.query('SELECT id FROM stores WHERE owner_id = ?', [ownerId]);
    if (storeRows.length === 0) {
      return res.status(404).json({ message: 'No store found for this owner' });
    }

    const storeId = storeRows[0].id;

    // Get all ratings for this store
    const [ratings] = await pool.query(`
      SELECT u.name as user_name, u.email, r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
    `, [storeId]);

    res.json({ storeId, ratings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get average rating of store
exports.getAverageRating = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const [storeRows] = await pool.query('SELECT id FROM stores WHERE owner_id = ?', [ownerId]);
    if (storeRows.length === 0) {
      return res.status(404).json({ message: 'No store found for this owner' });
    }

    const storeId = storeRows[0].id;

    const [avgRating] = await pool.query(`
      SELECT ROUND(AVG(rating), 1) as average_rating
      FROM ratings
      WHERE store_id = ?
    `, [storeId]);

    res.json({ storeId, average_rating: avgRating[0].average_rating || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
