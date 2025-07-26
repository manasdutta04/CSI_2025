import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart, Zap, Star } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleCart } from '../../store/slices/cartSlice';
import { setSearchQuery } from '../../store/slices/productsSlice';
import { toggleMobileMenu } from '../../store/slices/uiSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  
  const { itemCount } = useAppSelector((state) => state.cart.cart);
  const { mobileMenuOpen } = useAppSelector((state) => state.ui);
  const { categories } = useAppSelector((state) => state.products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      navigate('/products');
    }
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const toggleMenu = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <span className="text-white font-bold text-xl transform -rotate-12">N</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                NeoMart
              </span>
              <span className="text-xs text-purple-300 font-medium">Future Shopping</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-purple-200 hover:text-cyan-400 transition-all duration-200 font-medium relative group flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-purple-200 hover:text-cyan-400 transition-all duration-200 font-medium relative group flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>Products</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-purple-200 hover:text-cyan-400 transition-all duration-200 font-medium flex items-center relative space-x-1">
                <Menu className="h-4 w-4" />
                <span>Categories</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
              <div className="absolute top-full left-0 mt-3 w-64 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                {categories.map((category: string) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-6 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-cyan-400 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-10">
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for amazing products..."
                className="w-full px-6 py-3 pl-12 bg-slate-800/50 border border-purple-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-2 rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <button className="p-3 text-purple-200 hover:text-cyan-400 hover:bg-purple-500/20 rounded-xl transition-all duration-200">
              <User className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <button className="p-3 text-purple-200 hover:text-cyan-400 hover:bg-purple-500/20 rounded-xl transition-all duration-200">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative p-3 text-purple-200 hover:text-cyan-400 hover:bg-purple-500/20 rounded-xl transition-all duration-200 group"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 text-purple-200 hover:text-cyan-400 hover:bg-purple-500/20 rounded-xl transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/20">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-10 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-purple-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-cyan-400 rounded-xl transition-colors"
                onClick={toggleMenu}
              >
                <Zap className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-3 px-4 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-cyan-400 rounded-xl transition-colors"
                onClick={toggleMenu}
              >
                <Star className="h-5 w-5" />
                <span>All Products</span>
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="px-4 py-2">
              <div className="text-base font-medium text-cyan-400 mb-3">Categories</div>
              {categories.map((category: string) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="block px-3 py-2 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-cyan-400 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
