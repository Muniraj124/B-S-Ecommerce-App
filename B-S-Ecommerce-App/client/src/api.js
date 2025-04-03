// api.js
const API_BASE_URL = 'http://localhost:5000/api';  // Your backend API URL

// Utility function to handle API requests
async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// API call to get the list of all products
export const getProducts = async () => {
  const url = `${API_BASE_URL}/products`;
  try {
    const products = await fetchData(url);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// API call to get a single product by ID
export const getProductById = async (productId) => {
  const url = `${API_BASE_URL}/products/${productId}`;
  try {
    const product = await fetchData(url);
    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// API call to create a new order
export const createOrder = async (orderData) => {
  const url = `${API_BASE_URL}/orders`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  };

  try {
    const order = await fetchData(url, options);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// API call to initiate payment (for example, using Razorpay)
export const initiatePayment = async (paymentData) => {
  const url = `${API_BASE_URL}/payment/initiate`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  };

  try {
    const paymentResponse = await fetchData(url, options);
    return paymentResponse;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// API call to handle payment verification (Razorpay or other services)
export const verifyPayment = async (paymentId, orderId) => {
  const url = `${API_BASE_URL}/payment/verify`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentId, orderId }),
  };

  try {
    const verificationResponse = await fetchData(url, options);
    return verificationResponse;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// API call to get the current user's cart items
export const getCartItems = async (userId) => {
  const url = `${API_BASE_URL}/cart/${userId}`;
  try {
    const cart = await fetchData(url);
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// API call to add an item to the cart
export const addToCart = async (userId, productId, quantity) => {
  const url = `${API_BASE_URL}/cart/${userId}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  };

  try {
    const cartUpdateResponse = await fetchData(url, options);
    return cartUpdateResponse;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// API call to remove an item from the cart
export const removeFromCart = async (userId, productId) => {
  const url = `${API_BASE_URL}/cart/${userId}/remove/${productId}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const cartUpdateResponse = await fetchData(url, options);
    return cartUpdateResponse;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// API call to update the quantity of a cart item
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  const url = `${API_BASE_URL}/cart/${userId}/update`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  };

  try {
    const cartUpdateResponse = await fetchData(url, options);
    return cartUpdateResponse;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

// API call to checkout the cart and create an order
export const checkout = async (userId) => {
  const url = `${API_BASE_URL}/checkout/${userId}`;
  const options = {
    method: 'POST',
  };

  try {
    const checkoutResponse = await fetchData(url, options);
    return checkoutResponse;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

