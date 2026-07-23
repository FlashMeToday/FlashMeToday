const express = require('express');
const router = express.Router();
const {
  addPhotographer,
  getPhotographers,
  updatePhotographer,
  deletePhotographer
} = require('../controllers/photographerController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/')
  .post(protect, upload.single('profileImage'), addPhotographer)
  .get(protect, getPhotographers);

router.route('/:id')
  .put(protect, upload.single('profileImage'), updatePhotographer)
  .delete(protect, deletePhotographer);

module.exports = router;
