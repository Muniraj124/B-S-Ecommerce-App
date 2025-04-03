import React from 'react';

const ProductCard = ({ product }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{formatCurrency(product.price)}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

