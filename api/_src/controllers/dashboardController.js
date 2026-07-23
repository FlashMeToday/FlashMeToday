const Booking = require('../models/bookingModel');
const Contact = require('../models/contactModel');
const Photographer = require('../models/photographerModel');
const Blog = require('../models/blogModel');

// @desc    Get dashboard summary stats
// @route   GET /api/dashboard/stats
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBookings,
      unreadMessages,
      totalPhotographers,
      publishedBlogs,
      recentBookings,
      recentContacts
    ] = await Promise.all([
      Booking.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Photographer.countDocuments(),
      Blog.countDocuments({ status: 'Published' }),
      Booking.find().sort({ createdAt: -1 }).limit(3).lean(),
      Contact.find().sort({ createdAt: -1 }).limit(3).lean()
    ]);

    // Combine recent activities and sort them
    let recentActivity = [];
    
    recentBookings.forEach(b => {
      recentActivity.push({
        _id: b._id,
        type: 'booking',
        title: `New booking from ${b.name}`,
        subtitle: `For ${b.shootType || 'Photography Session'}`,
        createdAt: b.createdAt
      });
    });

    recentContacts.forEach(c => {
      recentActivity.push({
        _id: c._id,
        type: 'contact',
        title: `New message from ${c.name}`,
        subtitle: c.message ? (c.message.length > 50 ? c.message.substring(0, 50) + '...' : c.message) : '',
        createdAt: c.createdAt
      });
    });

    recentActivity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    recentActivity = recentActivity.slice(0, 5); // Take top 5

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalBookings,
          unreadMessages,
          totalPhotographers,
          publishedBlogs
        },
        recentActivity
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
