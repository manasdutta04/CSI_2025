import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              </Routes>
            </main>

            {/* Floating Scroll to Top Button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="floating-action"
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
              </button>
            )}
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
