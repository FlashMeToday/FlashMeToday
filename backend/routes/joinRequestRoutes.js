const express = require('express');
const { 
    submitJoinRequest, 
    getJoinRequests, 
    getUnreadJoinRequestCount, 
    markJoinRequestsAsRead, 
    deleteJoinRequest,
    updateJoinRequestStatus
} = require('../controllers/joinRequestController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', (req, res, next) => {
    upload.array('photos', 5)(req, res, (err) => {
        if (err) {
            console.error('Multer/Cloudinary Error:', err);
            return res.status(400).json({ success: false, message: 'File upload failed', error: err.message || err });
        }
        next();
    });
}, submitJoinRequest);
router.get('/', protect, getJoinRequests);
router.get('/unread', protect, getUnreadJoinRequestCount);
router.put('/mark-read', protect, markJoinRequestsAsRead);
router.delete('/:id', protect, deleteJoinRequest);
router.put('/:id/status', protect, updateJoinRequestStatus);

module.exports = router;
