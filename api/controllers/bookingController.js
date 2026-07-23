const Booking = require('../models/bookingModel');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { name, email, mobile, shootTime, plan, typeOfShoot, city, location } = req.body;

    if (!name || !email || !mobile || !shootTime || !plan || !typeOfShoot || !city) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const booking = await Booking.create({
      name,
      email,
      mobile,
      shootTime,
      plan,
      typeOfShoot,
      city,
      location
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all bookings (with pagination)
// @route   GET /api/bookings
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const [total, bookings] = await Promise.all([
      Booking.countDocuments(),
      Booking.find()
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .lean()
    ]);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get unread bookings count (Pending bookings)
// @route   GET /api/bookings/unread
// @access  Private (Admin)
const getUnreadBookingsCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({ status: 'Pending' });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getUnreadBookingsCount
};
