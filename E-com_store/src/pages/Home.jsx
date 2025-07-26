import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to NeoMart</h1>
            <p>Experience the future of shopping with cutting-edge technology</p>
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
