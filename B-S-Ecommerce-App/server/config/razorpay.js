import React from 'react';
import axios from 'axios'; // To make API requests
import { toast } from 'react-toastify'; // Optional: For showing payment success/failure messages

const RazorpayCheckout = ({ amount, orderId, onPaymentSuccess, onPaymentFailure }) => {

  // Function to trigger the Razorpay payment gateway
  const initiatePayment = async () => {
    try {
      // Make an API request to your backend to get the Razorpay order details
      const response = await axios.post('/api/payment/razorpay', {
        amount: amount * 100, // Razorpay accepts amount in paise (1 INR = 100 paise)
        orderId: orderId
      });

      const { data } = response;
      const { orderId: razorpayOrderId, paymentOptions } = data;

      // Initialize Razorpay payment gateway with options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: amount * 100, // The amount to be paid (in paise)
        currency: "INR", // Currency type (INR for Indian Rupees)
        name: "B&S Store", // Your company/store name
        description: "Product Purchase", // Description of the transaction
        image: "/logo.png", // Optional: Your store logo
        order_id: razorpayOrderId, // Order ID from your backend
        handler: function (response) {
          // On successful payment
          onPaymentSuccess(response);
        },
        prefill: {
          name: paymentOptions.customer_name, // Customer name
          email: paymentOptions.customer_email, // Customer email
          contact: paymentOptions.customer_phone, // Customer phone
        },
        notes: {
          address: "B&S Store address", // Optional: Customer address or other notes
        },
        theme: {
          color: "#F37254" // Optional: Customize the theme color
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      toast.error("Something went wrong with payment initiation. Please try again!");
      onPaymentFailure(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={initiatePayment}>
        Pay ₹{amount}
      </button>
    </div>
  );
};

export default RazorpayCheckout;

