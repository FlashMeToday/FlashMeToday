const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
  profileImage: {
    type: String, // Cloudinary URL
  },
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'India',
  },
  nearbyCities: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['Available', 'Booked', 'On Leave'],
    default: 'Available',
  },
  experience: {
    type: String,
  },
  expertise: {
    type: String,
  },
  equipment: {
    type: String,
  }
}, {
  timestamps: true
});

const Photographer = mongoose.model('Photographer', photographerSchema);
module.exports = Photographer;
