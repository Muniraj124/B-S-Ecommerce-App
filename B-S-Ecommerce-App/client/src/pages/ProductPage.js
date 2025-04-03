import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './ProductPage.css'; // Optional: You can create specific styles for this page

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`); // Get product details by ID from the backend
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle adding product to the cart
  const handleAddToCart = () => {
    // For simplicity, we'll just log the product to the console.
    // In a real-world scenario, you'd add the product to a global state or local storage for the cart.
    console.log('Added to cart:', product);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching product data
  }

  if (!product) {
    return <div>Product not found</div>; // Show error message if the product isn't found
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price: ₹{product.price}</strong></p>
          <button className="btn-primary" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      <button className="btn-back" onClick={() => history.goBack()}>
        Back to Products
      </button>
    </div>
  );
};

export default ProductPage;

