import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Player from '../player/Player';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Add page transition effect when route changes
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className="layout-container">
      <div className="layout-content">
        <Sidebar />
        <main className={`main-content ${isPageTransitioning ? 'animate-fade-in' : ''}`}>
          <div className="page-transition">
            {children}
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
};

export default Layout; 