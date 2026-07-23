const Contact = require('../models/contactModel');

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    try {
        const { fullName, email, phone, concern, details } = req.body;

        if (!fullName || !email || !phone || !concern || !details) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const newContact = new Contact({
            fullName,
            email,
            phone,
            concern,
            details
        });

        await newContact.save();

        return res.status(201).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        return res.status(500).json({ success: false, message: 'Server error during submission' });
    }
};

// @desc    Get all contact messages (Paginated)
// @route   GET /api/contact
// @access  Private (Admin only)
const getContactMessages = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // Fetch messages and total count concurrently
        const [messages, total] = await Promise.all([
            Contact.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Contact.countDocuments({})
        ]);

        return res.json({
            success: true,
            count: messages.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: messages
        });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return res.status(500).json({ success: false, message: 'Server error while fetching messages' });
    }
};

// @desc    Get unread contact messages count
// @route   GET /api/contact/unread
// @access  Private (Admin only)
const getUnreadContactCount = async (req, res) => {
    try {
        const count = await Contact.countDocuments({ isRead: false });
        return res.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        return res.status(500).json({ success: false, message: 'Server error while fetching unread count' });
    }
};

// @desc    Mark all contact messages as read
// @route   PUT /api/contact/mark-read
// @access  Private (Admin only)
const markContactsAsRead = async (req, res) => {
    try {
        await Contact.updateMany({ isRead: false }, { isRead: true });
        return res.json({ success: true, message: 'All messages marked as read' });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        return res.status(500).json({ success: false, message: 'Server error while marking messages as read' });
    }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
const deleteContactMessage = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        return res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ success: false, message: 'Server error while deleting message' });
    }
};

module.exports = {
    submitContactForm,
    getContactMessages,
    getUnreadContactCount,
    markContactsAsRead,
    deleteContactMessage
};
