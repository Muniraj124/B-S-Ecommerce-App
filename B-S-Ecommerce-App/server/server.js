// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Log HTTP requests in development mode
}

// Connect to the database (MongoDB)
connectDB();

// Routes
app.use('/api/payment', paymentRoutes); // Payment routes (Razorpay integration)
app.use('/api/auth', authRoutes); // Authentication routes (login, register)

// Catch-all for undefined routes - 404 error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? error.stack : null,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

