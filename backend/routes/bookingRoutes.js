const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookings, 
  updateBookingStatus, 
  deleteBooking,
  getUnreadBookingsCount
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createBooking);
router.get('/', protect, getBookings);
router.get('/unread', protect, getUnreadBookingsCount);
router.put('/:id/status', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
