import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Eye, Zap } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { setQuickViewProduct } from '../../store/slices/uiSlice';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setQuickViewProduct(product.id));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-slate-600'
        }`}
      />
    ));
  };

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.onSale && (
            <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              <Zap className="h-3 w-3" />
              <span>-{product.discountPercentage}%</span>
            </span>
          )}
          {product.featured && (
            <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>FEATURED</span>
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-slate-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-3">
          <button
            onClick={handleWishlist}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 backdrop-blur-sm border ${
              isWishlisted
                ? 'bg-red-500/80 text-white border-red-400'
                : 'bg-slate-800/80 text-purple-300 hover:text-cyan-400 border-purple-500/30'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className="w-12 h-12 bg-slate-800/80 text-purple-300 hover:text-cyan-400 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 backdrop-blur-sm border border-purple-500/30"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 hover:text-cyan-400 transition-colors leading-tight group-hover:text-cyan-400">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        <p className="text-sm text-purple-300 mb-3 font-medium">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-purple-300 font-medium">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-sm text-orange-400 font-medium mb-4 bg-orange-500/10 px-3 py-1 rounded-full inline-block border border-orange-500/20">
            Only {product.stock} left!
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/25 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
