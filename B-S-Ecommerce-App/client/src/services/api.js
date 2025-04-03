import axios from 'axios';

// Set up the base URL for the API
const API_BASE_URL = 'https://your-backend-api.com/api'; // Replace with your backend API URL

// Axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Timeout in ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all products from the API
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data; // Assuming the response is in the format { data: [...] }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow error for further handling
  }
};

// Fetch product details by ID
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Add a product to the cart (local storage or backend can be used)
export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase quantity
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

// Get cart items from local storage
export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Remove item from cart
export const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Place an order (send cart data to backend)
export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData); // Send order data to backend
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// User authentication: Register a user (signup)
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// User authentication: Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Fetch user profile data
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/me'); // Assuming 'me' endpoint for the authenticated user
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Initiate payment (this could be integrating with Razorpay, PhonePe, GPay, Paytm)
export const initiatePayment = async (orderDetails) => {
  try {
    const response = await api.post('/payment/initiate', orderDetails);
    return response.data; // Returns payment details like payment link or order ID
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  addToCart,
  getCartItems,
  removeFromCart,
  placeOrder,
  registerUser,
  loginUser,
  getUserProfile,
  initiatePayment,
};

