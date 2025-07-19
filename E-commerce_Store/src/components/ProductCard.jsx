import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { viewMode } = useProducts();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div className={`product-card ${viewMode}`}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        <button className="wishlist-btn">
          <Heart size={20} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        
        {viewMode === 'list' && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price}</span>
          </div>

          <button 
            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
            {viewMode === 'list' ? 'Add to Cart' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
