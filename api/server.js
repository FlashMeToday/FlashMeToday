require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Routes
const authRoutes = require('./_src/routes/authRoutes');
const contactRoutes = require('./_src/routes/contactRoutes');
const joinRequestRoutes = require('./_src/routes/joinRequestRoutes');
const photographerRoutes = require('./_src/routes/photographerRoutes');
const bookingRoutes = require('./_src/routes/bookingRoutes');
const blogRoutes = require('./_src/routes/blogRoutes');
const uploadRoutes = require('./_src/routes/uploadRoutes');
const dashboardRoutes = require('./_src/routes/dashboardRoutes');
const connectDB = require('./_src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Custom Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    let emoji = '✅';
    if (res.statusCode >= 400 && res.statusCode < 500) emoji = '⚠️';
    if (res.statusCode >= 500) emoji = '❌';
    
    console.log(`${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${emoji} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/join-requests', joinRequestRoutes);
app.use('/api/photographers', photographerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Initialization
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
