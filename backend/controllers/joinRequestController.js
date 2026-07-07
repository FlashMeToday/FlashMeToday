const JoinRequest = require('../models/joinRequestModel');
const { cloudinary, getPublicIdFromUrl } = require('../middleware/uploadMiddleware');

// @desc    Submit a join request
// @route   POST /api/join-requests
// @access  Public
const submitJoinRequest = async (req, res) => {
    try {
        const uploadedPhotos = req.files ? req.files.map(file => file.path) : [];
        
        const requestData = {
            ...req.body,
            uploadedPhotos
        };
        
        const newRequest = await JoinRequest.create(requestData);
        return res.status(201).json({ success: true, data: newRequest });
    } catch (error) {
        console.error('Error submitting join request:', error);
        return res.status(500).json({ success: false, message: 'Server error while submitting join request' });
    }
};

// @desc    Get all join requests (Paginated)
// @route   GET /api/join-requests
// @access  Private (Admin only)
const getJoinRequests = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const [requests, total] = await Promise.all([
            JoinRequest.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            JoinRequest.countDocuments({})
        ]);

        return res.json({
            success: true,
            count: requests.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: requests
        });
    } catch (error) {
        console.error('Error fetching join requests:', error);
        return res.status(500).json({ success: false, message: 'Server error while fetching join requests' });
    }
};

// @desc    Get unread join request count
// @route   GET /api/join-requests/unread
// @access  Private (Admin only)
const getUnreadJoinRequestCount = async (req, res) => {
    try {
        const count = await JoinRequest.countDocuments({ isRead: false });
        return res.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        return res.status(500).json({ success: false, message: 'Server error while fetching unread count' });
    }
};

// @desc    Mark all join requests as read
// @route   PUT /api/join-requests/mark-read
// @access  Private (Admin only)
const markJoinRequestsAsRead = async (req, res) => {
    try {
        await JoinRequest.updateMany({ isRead: false }, { isRead: true });
        return res.json({ success: true, message: 'All join requests marked as read' });
    } catch (error) {
        console.error('Error marking join requests as read:', error);
        return res.status(500).json({ success: false, message: 'Server error while marking read' });
    }
};

// @desc    Delete a join request
// @route   DELETE /api/join-requests/:id
// @access  Private
const deleteJoinRequest = async (req, res) => {
    try {
        const request = await JoinRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ success: false, message: 'Join request not found' });
        }

        if (request.uploadedPhotos && request.uploadedPhotos.length > 0) {
            for (const photoUrl of request.uploadedPhotos) {
                const publicId = getPublicIdFromUrl(photoUrl);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (cloudErr) {
                        console.error('Error deleting from Cloudinary:', cloudErr);
                    }
                }
            }
        }

        await JoinRequest.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'Join request deleted successfully' });
    } catch (error) {
        console.error('Error deleting join request:', error);
        return res.status(500).json({ success: false, message: 'Server error while deleting join request' });
    }
};

// @desc    Update join request status
// @route   PUT /api/join-requests/:id/status
// @access  Private
const updateJoinRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const request = await JoinRequest.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ success: false, message: 'Join request not found' });
        }

        request.status = status;
        await request.save();

        return res.status(200).json({ success: true, data: request });
    } catch (error) {
        console.error('Error updating join request status:', error);
        return res.status(500).json({ success: false, message: 'Server error while updating status' });
    }
};

module.exports = {
    submitJoinRequest,
    getJoinRequests,
    getUnreadJoinRequestCount,
    markJoinRequestsAsRead,
    deleteJoinRequest,
    updateJoinRequestStatus
};
