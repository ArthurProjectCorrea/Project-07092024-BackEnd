const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Test MongoDB connection status
app.get('/api/db-status', (req, res) => {
  const connectionStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ status: connectionStatus });
});

// Define Routes
app.use('/api/example', require('./api/routes/example'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
