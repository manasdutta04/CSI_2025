import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: {
    items: CartItem[];
    itemCount: number;
    total: number;
  };
  isOpen: boolean;
}

const initialState: CartState = {
  cart: {
    items: [],
    itemCount: 0,
    total: 0,
  },
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: any }>) => {
      const { product } = action.payload;
      const existingItem = state.cart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
      
      state.cart.itemCount = state.cart.items.reduce((total, item) => total + item.quantity, 0);
      state.cart.total = state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      state.cart.itemCount = state.cart.items.reduce((total, item) => total + item.quantity, 0);
      state.cart.total = state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cart.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.cart.items = state.cart.items.filter(item => item.id !== id);
        }
      }
      state.cart.itemCount = state.cart.items.reduce((total, item) => total + item.quantity, 0);
      state.cart.total = state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.itemCount = 0;
      state.cart.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
