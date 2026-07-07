const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  shootTime: {
    type: Date,
    required: [true, 'Shoot time is required']
  },
  plan: {
    type: String,
    required: [true, 'Plan is required']
  },
  typeOfShoot: {
    type: String,
    required: [true, 'Type of shoot is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  location: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
