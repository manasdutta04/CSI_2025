import React, { createContext, useContext, useState } from 'react';

// Product Context for managing products, search, and filters
const ProductContext = createContext();

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    rating: 4.5,
    inStock: true,
    brand: "AudioTech"
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Durable protective case for smartphones with shock absorption technology.",
    rating: 4.2,
    inStock: true,
    brand: "ProtectPro"
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    description: "Lightweight running shoes with advanced cushioning and breathable fabric.",
    rating: 4.7,
    inStock: true,
    brand: "SportMax"
  },
  {
    id: 4,
    name: "Coffee Mug Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    category: "Home",
    description: "Set of 4 ceramic coffee mugs with elegant design and heat retention.",
    rating: 4.3,
    inStock: true,
    brand: "HomeEssentials"
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    description: "Spacious laptop backpack with multiple compartments and water-resistant material.",
    rating: 4.4,
    inStock: true,
    brand: "TravelGear"
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Home",
    description: "Adjustable LED desk lamp with touch controls and USB charging port.",
    rating: 4.6,
    inStock: true,
    brand: "LightMax"
  },
  {
    id: 7,
    name: "Fitness Tracker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Advanced fitness tracker with heart rate monitoring and GPS functionality.",
    rating: 4.1,
    inStock: false,
    brand: "FitTech"
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "Sports",
    description: "Non-slip yoga mat with extra cushioning and eco-friendly materials.",
    rating: 4.8,
    inStock: true,
    brand: "YogaLife"
  }
];

// Product Provider Component
export const ProductProvider = ({ children }) => {
  const [products] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'rating'

  // Get all unique categories
  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.sort();
  };

  // Filter and search products
  const getFilteredProducts = () => {
    let filteredProducts = products;

    // Filter by search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filteredProducts;
  };

  // Get product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const value = {
    products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    getCategories,
    getFilteredProducts,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
