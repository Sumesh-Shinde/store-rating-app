// controllers/storeController.js
const pool = require('../config/db');

// Get all stores with average rating and user's own rating
exports.getAllStores = async (req, res) => {
  const userId = req.user.id; // from auth middleware

  try {
    const [stores] = await pool.query(`
      SELECT s.id, s.name, s.address,
        ROUND(AVG(r.rating), 1) as average_rating,
        (
          SELECT rating
          FROM ratings
          WHERE user_id = ? AND store_id = s.id
          LIMIT 1
        ) as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `, [userId]);

    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
