const express = require('express');
const paymentController = require('../controllers/paymentController');
const authenticateUser = require('../middleware/authenticateUser'); // Optional: Use if you have user authentication

const router = express.Router();

// Route to create a Razorpay order (initiating payment)
router.post('/razorpay', authenticateUser, paymentController.createOrder);

// Route to verify payment after completion (verify the payment signature)
router.post('/verify', authenticateUser, paymentController.verifyPayment);

module.exports = router;

