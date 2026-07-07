const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n==============================================`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`==============================================\n`);
  } catch (error) {
    console.error(`\n❌ Error connecting to MongoDB: ${error.message}\n`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
