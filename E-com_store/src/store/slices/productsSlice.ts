import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  onSale?: boolean;
  featured?: boolean;
  category: string;
  description: string;
  discountPercentage: number;
}

interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchQuery: string;
  currentProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  categories: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
  loading: 'idle',
  searchQuery: '',
  currentProduct: null,
};

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    brand: "AudioTech",
    rating: 4.5,
    reviewCount: 124,
    stock: 15,
    onSale: true,
    featured: true,
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation",
    discountPercentage: 20
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    brand: "FitTech",
    rating: 4.8,
    reviewCount: 89,
    stock: 8,
    featured: true,
    category: "Electronics",
    description: "Advanced fitness tracking with heart rate monitor",
    discountPercentage: 0
  },
  {
    id: 3,
    name: "Premium Running Shoes",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    brand: "SportMax",
    rating: 4.3,
    reviewCount: 256,
    stock: 23,
    onSale: true,
    category: "Sports",
    description: "Lightweight running shoes with premium cushioning",
    discountPercentage: 19
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: 449.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
    brand: "LensMaster",
    rating: 4.7,
    reviewCount: 156,
    stock: 5,
    onSale: true,
    featured: true,
    category: "Electronics",
    description: "Professional grade camera lens for stunning photography",
    discountPercentage: 10
  }
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.products = action.payload;
        state.featuredProducts = action.payload.filter(product => product.featured);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const { setSearchQuery, setCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
