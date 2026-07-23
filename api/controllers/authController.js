const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        // Check if admin exists and password matches
        if (admin && (await admin.matchPassword(password))) {
            const token = jwt.sign(
                { role: admin.role, email: admin.email, id: admin._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            return res.json({ 
                success: true, 
                token, 
                message: 'Logged in successfully' 
            });
        }

        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// @desc    Update Admin Credentials
// @route   PUT /api/admin/update
// @access  Private
const updateAdminCredentials = async (req, res) => {
    try {
        const { oldPassword, newEmail, newPassword } = req.body;

        if (!oldPassword) {
            return res.status(400).json({ success: false, message: 'Old password is required' });
        }

        const admin = await Admin.findById(req.admin.id);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Verify old password
        if (!(await admin.matchPassword(oldPassword))) {
            return res.status(401).json({ success: false, message: 'Incorrect old password' });
        }

        // Update email if provided
        if (newEmail) {
            admin.email = newEmail;
        }

        // Update password if provided
        if (newPassword) {
            if (newPassword.length < 6) {
                return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
            }
            admin.password = newPassword;
        }

        await admin.save();

        // Generate a fresh token just in case
        const token = jwt.sign(
            { role: admin.role, email: admin.email, id: admin._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        return res.json({ 
            success: true, 
            message: 'Credentials updated successfully',
            token
        });
    } catch (error) {
        console.error('Update credentials error:', error);
        return res.status(500).json({ success: false, message: 'Server error during update' });
    }
};

module.exports = {
    loginAdmin,
    updateAdminCredentials
};
