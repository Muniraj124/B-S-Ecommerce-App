import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency'; // Utility function to format currency

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();

  // Example to load cart data from local storage or API
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);

    // Calculate the total price
    const total = savedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  // Handle removing an item from the cart
  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate total price after removal
    const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  // Handle checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Redirect to payment page (checkout)
    history.push('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* Check if there are any items in the cart */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {/* Cart items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{formatCurrency(item.price)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="cart-summary">
            <h3>Total Amount: {formatCurrency(totalAmount)}</h3>
            <button onClick={proceedToCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

