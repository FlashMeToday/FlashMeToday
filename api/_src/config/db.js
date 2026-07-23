const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = conn.connections[0].readyState;
    console.log(`\n==============================================`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`==============================================\n`);
  } catch (error) {
    console.error(`\n❌ Error connecting to MongoDB: ${error.message}\n`);
    throw error; // Throw error instead of process.exit in serverless
  }
};

module.exports = connectDB;
