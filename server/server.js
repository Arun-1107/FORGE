const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
require('dotenv').config();

// Create Express application instance
const app = express();

// 1. Establish database connection (Mongoose ODM)
// In a local development environment, this connects to your local MongoDB service.
connectDB();

// 2. Configure Middlewares
// CORS is critical to allow your React app on port 5173 to fetch data from this server on port 5000
app.use(cors());
// Parse incoming JSON requests, populating req.body
app.use(express.json());

// 3. Register API Routes
app.use('/api', require('./routes/api'));

// Root endpoint for verification check
app.get('/', (req, res) => {
  res.json({
    message: 'FORGE Backend API Server is operational.',
    version: '1.0.0',
    documentation: '/api/profile, /api/fitness, /api/diet'
  });
});

// 4. Start Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` FORGE SERVER STARTING...`);
  console.log(` Running in Development mode`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` API Endpoint Root: http://localhost:${PORT}/api`);
  console.log(`==================================================`);
});
