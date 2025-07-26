import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Github, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
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
            </div>
            <p className="text-purple-200 mb-6 max-w-md leading-relaxed">
              Experience the future of e-commerce with NeoMart. We bring tomorrow's shopping experience to you today, 
              powered by cutting-edge technology and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:scale-110 transition-transform duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-110 transition-transform duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:scale-110 transition-transform duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:scale-110 transition-transform duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <Zap className="h-5 w-5 text-cyan-400 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-purple-200 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-purple-200 hover:text-cyan-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-purple-200 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-purple-200 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-purple-200">hello@neomart.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <span className="text-purple-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span className="text-purple-200">Future City, Space Station 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Future
            </h3>
            <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and future innovations.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-purple-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-purple-300 text-sm">
              © 2025 NeoMart. All rights reserved. Powered by future technology.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-purple-300 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-purple-300 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-purple-300 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
