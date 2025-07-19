import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to ShopHub</h1>
            <p>Discover amazing products at unbeatable prices</p>
          </div>
        </div>
        
        <section className="featured-products">
          <h2>Featured Products</h2>
          <ProductList />
        </section>
      </div>
    </div>
  );
};

export default Home;
