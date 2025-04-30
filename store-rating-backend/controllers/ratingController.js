// controllers/ratingController.js
const pool = require('../config/db');

// Submit or update a rating
exports.submitRating = async (req, res) => {
  const userId = req.user.id;
  const { storeId, rating } = req.body;

  if (!storeId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if rating exists
    const [existing] = await pool.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );

    if (existing.length > 0) {
      // Update rating
      await pool.query(
        'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
        [rating, userId, storeId]
      );
      return res.json({ message: 'Rating updated' });
    } else {
      // Insert new rating
      await pool.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [userId, storeId, rating]
      );
      return res.json({ message: 'Rating submitted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
