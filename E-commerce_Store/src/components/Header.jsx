import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import './Header.css';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();
  const cartItemsCount = getCartItemsCount();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>ShopHub</h1>
          </Link>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            <button className="action-btn">
              <User size={20} />
            </button>
            
            <Link to="/cart" className="action-btn cart-btn">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>

            <button className="mobile-menu-btn">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
