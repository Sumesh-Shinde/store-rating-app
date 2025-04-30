const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Only logged-in users can access
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'You are logged in!', user: req.user });
});

// Only Admins can access
router.get('/admin-only', authMiddleware, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});
