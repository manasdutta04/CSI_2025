import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeConfig } from '../types';

interface ThemeContextType {
  themeConfig: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  toggleMode: () => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  mode: 'light',
  borderRadius: 8,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('dashboard-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('dashboard-theme', JSON.stringify(themeConfig));
  }, [themeConfig]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...updates }));
  };

  const toggleMode = () => {
    setThemeConfig(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const muiTheme = createTheme({
    palette: {
      mode: themeConfig.mode,
      primary: {
        main: themeConfig.primaryColor,
      },
      secondary: {
        main: themeConfig.secondaryColor,
      },
      background: {
        default: themeConfig.mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: themeConfig.mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: themeConfig.fontFamily,
    },
    shape: {
      borderRadius: themeConfig.borderRadius,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: themeConfig.mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeConfig, updateTheme, toggleMode }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 