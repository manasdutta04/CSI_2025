import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  mobileMenuOpen: boolean;
  quickViewProduct: number | null;
  theme: 'light' | 'dark';
  viewMode: 'grid' | 'list';
}

const initialState: UIState = {
  mobileMenuOpen: false,
  quickViewProduct: null,
  theme: 'dark',
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { toggleMobileMenu, setQuickViewProduct, toggleTheme, setViewMode } = uiSlice.actions;
export default uiSlice.reducer;
