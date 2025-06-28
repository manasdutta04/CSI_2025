import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={handleDrawerToggle} drawerWidth={drawerWidth} />
      
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          ml: { md: `${drawerWidth}px` },
          transition: 'margin 0.3s ease-in-out',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}; 