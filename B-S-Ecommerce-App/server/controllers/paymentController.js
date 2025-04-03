const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { Order } = require('../models'); // Assuming you have an Order model to save the order in the database

dotenv.config(); // Load environment variables from .env file

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay Key Secret
});

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    // Create a new Razorpay order
    const orderOptions = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: orderId, // You can use any unique identifier, here we are using the `orderId` sent from frontend
      payment_capture: 1, // Automatically capture payment after successful authorization
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save the order to your database (optional but recommended)
    const newOrder = await Order.create({
      orderId: order.id,
      amount: amount,
      status: 'pending',
      userId: req.user.id, // Assuming you have user authentication in place
      // Add more fields as needed, e.g. customer details, product details, etc.
    });

    // Return order details to frontend
    res.status(200).json({
      orderId: order.id, // Razorpay order ID
      paymentOptions: {
        customer_name: req.user.name, // You can fetch this from the logged-in user's session or DB
        customer_email: req.user.email,
        customer_phone: req.user.phone, // Optional: Replace with actual customer details
      },
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Error creating Razorpay order' });
  }
};

// Verify Razorpay Payment Signature
exports.verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest('hex');

  // Verify if the payment signature is valid
  if (generatedSignature === signature) {
    try {
      // Payment verified successfully
      // Update the payment status in the database (optional but recommended)
      const order = await Order.findOne({ where: { orderId: orderId } });

      if (!order) {
        return res.status(400).json({ message: 'Order not found' });
      }

      order.status = 'paid'; // Update order status to "paid"
      await order.save();

      // Optionally, you can send a confirmation email or notification to the user

      // Respond to the frontend indicating the payment was successful
      res.status(200).json({
        message: 'Payment successful',
        paymentId,
        orderId,
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ message: 'Error verifying payment' });
    }
  } else {
    // Invalid signature, payment verification failed
    res.status(400).json({ message: 'Payment verification failed' });
  }
};

