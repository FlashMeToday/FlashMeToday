const express = require('express');
const { submitContactForm, getContactMessages, getUnreadContactCount, markContactsAsRead, deleteContactMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', protect, getContactMessages);
router.get('/unread', protect, getUnreadContactCount);
router.put('/mark-read', protect, markContactsAsRead);
router.delete('/:id', protect, deleteContactMessage);

module.exports = router;
