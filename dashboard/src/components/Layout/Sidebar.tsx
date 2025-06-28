import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  BarChart as ChartIcon,
  CalendarToday as CalendarIcon,
  ViewKanban as KanbanIcon,
  Settings as SettingsIcon,
  Palette as ThemeIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Tables', icon: <TableIcon />, path: '/tables' },
  { text: 'Charts', icon: <ChartIcon />, path: '/charts' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Kanban', icon: <KanbanIcon />, path: '/kanban' },
  { text: 'Theme', icon: <ThemeIcon />, path: '/theme' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < theme.breakpoints.values.md) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" component="h1" fontWeight="bold" color="primary" sx={{ mb: 0.5 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Management System
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, py: 2, px: 1, overflow: 'auto' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateX(4px)',
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '15',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '25',
                    transform: 'translateX(4px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '60%',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '0 2px 2px 0',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path 
                    ? theme.palette.primary.main 
                    : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
        <Typography variant="caption" color="text.secondary">
          Version 1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            position: 'relative',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}; 