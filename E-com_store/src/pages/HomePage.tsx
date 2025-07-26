import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, Headphones, Star, Sparkles, Rocket } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { featuredProducts, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-cyan-400" />,
      title: 'Lightning Fast',
      description: 'Instant delivery with our quantum logistics network',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      title: 'Quantum Security',
      description: 'Military-grade encryption for all transactions',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-yellow-400" />,
      title: 'AI Powered',
      description: 'Smart recommendations just for you',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Zap className="h-8 w-8 text-green-400" />,
      title: 'Future Tech',
      description: 'Next-generation shopping experience',
      gradient: 'from-green-500 to-teal-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Welcome to the Future of Shopping</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
              <br />
              <span className="text-white">Tomorrow's</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-purple-200 leading-relaxed max-w-3xl mx-auto">
              Step into NeoMart - where cutting-edge technology meets exceptional products. 
              Discover a shopping experience that's light-years ahead.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Link
                to="/products"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                <Rocket className="mr-3 h-6 w-6" />
                Launch Shopping
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products?featured=true"
                className="group inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-2xl hover:bg-purple-400/10 transition-all duration-300 hover:scale-105"
              >
                <Star className="mr-3 h-6 w-6" />
                Explore Featured
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl rotate-45 animate-bounce opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-lg rotate-12 animate-spin-slow opacity-25"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose NeoMart?
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              We're not just another store - we're pioneers of the future shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Products
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Handpicked premium products that define the future of innovation
            </p>
          </div>
          
          {loading === 'loading' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-600"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-slate-600 rounded"></div>
                    <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                    <div className="h-6 bg-slate-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link
                  to="/products"
                  className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  Explore All Products
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready for the Future?
            </span>
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Join millions of satisfied customers who've already stepped into tomorrow's shopping experience.
          </p>
          <Link
            to="/products"
            className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-xl rounded-3xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25"
          >
            <Rocket className="mr-4 h-8 w-8" />
            Start Your Journey
            <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
