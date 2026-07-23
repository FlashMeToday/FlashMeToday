const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a short excerpt'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide the blog content'],
  },
  author: {
    type: String,
    required: [true, 'Please provide the author name'],
    default: 'FlashMeToday Team'
  },
  image: {
    type: String,
    required: [true, 'Please provide a cover image URL'],
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  date: {
    type: String, // Storing formatted date to match the existing JSON structure easily, though we also have createdAt
  }
}, {
  timestamps: true
});

// Pre-save middleware to format the date if not provided
blogSchema.pre('save', function() {
  if (!this.date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    this.date = new Date().toLocaleDateString('en-GB', options);
  }
});

module.exports = mongoose.model('Blog', blogSchema);
