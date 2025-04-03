// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.loginUser);

module.exports = router;

