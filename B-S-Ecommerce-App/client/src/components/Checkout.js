import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency'; // Utility function to format currency
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  // Load cart items and total amount from localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);

    // Calculate total amount
    const total = savedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // Handle payment gateway and order creation
  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address || !userDetails.phone) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const orderResponse = await axios.post('/api/payment/create-order', { amount: totalAmount });

      const { id, amount, currency } = orderResponse.data;

      // Setup Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'B&S Store',
        description: 'Order Payment',
        order_id: id,
        handler: function (response) {
          axios
            .post('/api/payment/verify-payment', {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            })
            .then(() => {
              setMessage('Payment Successful');
              history.push('/success'); // Redirect to success page after payment
            })
            .catch(() => {
              setMessage('Payment Verification Failed');
            });
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setMessage('Error during payment processing');
      console.error(error);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty! Please add items to the cart.</p>
      ) : (
        <div className="checkout-cart">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{formatCurrency(item.price)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: {formatCurrency(totalAmount)}</h3>
          </div>
        </div>
      )}

      {/* Shipping Information */}
      <div className="shipping-info">
        <h3>Shipping Details</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Address:
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </form>
      </div>

      {/* Display Message */}
      {message && <p>{message}</p>}

      {/* Payment Button */}
      <button onClick={handlePayment} className="payment-btn">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;

