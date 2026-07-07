const express = require('express');
const { loginAdmin, updateAdminCredentials } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.put('/update', protect, updateAdminCredentials);

module.exports = router;
