import React from 'react';
import ProductList from '../components/ProductList';

const Products = () => {
  return (
    <div className="products-page">
      <div className="container">
        <h1>All Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
