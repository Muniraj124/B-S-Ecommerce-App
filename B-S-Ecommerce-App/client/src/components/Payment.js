import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post('/api/payment/create-order', { amount });
      const { id, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        name: 'B&S Store',
        description: 'Purchase from B&S Store',
        order_id: id,
        handler: function (response) {
          axios
            .post('/api/payment/verify-payment', {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            })
            .then(() => setMessage('Payment Successful'))
            .catch(() => setMessage('Payment Verification Failed'));
        },
        prefill: { name: 'User', email: 'user@example.com', contact: '9876543210' },
        theme: { color: '#3399cc' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setMessage('Error initiating payment');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" />
      <button onClick={handlePayment}>Pay {formatCurrency(amount)}</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Payment;

