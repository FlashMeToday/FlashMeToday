const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @desc    Upload an image to Cloudinary
// @access  Admin
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image provided' });
  }

  res.status(200).json({
    success: true,
    url: req.file.path // Cloudinary returns the URL in req.file.path
  });
});

module.exports = router;
