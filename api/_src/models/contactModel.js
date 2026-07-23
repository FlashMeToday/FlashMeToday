const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
