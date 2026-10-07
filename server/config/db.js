const mongoose = require('mongoose');

/**
 * MongoDB Connection Handler
 * 
 * In the MERN stack, Mongoose acts as the ODM (Object Document Mapper) 
 * that connects your Node.js application to MongoDB.
 */
const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/forge_db';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    // Connect to MongoDB
    const conn = await mongoose.connect(connStr, { serverSelectionTimeoutMS: 5000 });
    
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Ensure MongoDB is installed and running locally, or update MONGO_URI in server/.env');
    console.log('Running backend in offline fallback mode (in-memory).');
  }
};

module.exports = connectDB;
