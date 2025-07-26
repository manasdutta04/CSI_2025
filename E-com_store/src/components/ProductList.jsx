import React from 'react';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const {
    getFilteredProducts,
    getCategories,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    searchTerm,
  } = useProducts();

  const filteredProducts = getFilteredProducts();
  const categories = getCategories();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="product-list-container">
      {/* Filters and Controls */}
      <div className="controls-bar">
        <div className="filters-section">
          <div className="filter-group">
            <Filter size={20} />
            <span className="filter-label">Categories:</span>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-group">
            <SortAsc size={20} />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          {searchTerm && (
            <>Showing results for "{searchTerm}" - </>
          )}
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {selectedCategory && (
            <> in {selectedCategory}</>
          )}
        </span>
      </div>

      {/* Product Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className={`products-container ${viewMode}`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
