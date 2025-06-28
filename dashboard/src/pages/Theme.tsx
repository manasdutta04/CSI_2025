import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  RestartAlt as ResetIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';
import { useTheme } from '../contexts/ThemeContext';

const Theme: React.FC = () => {
  const { themeConfig, updateTheme, toggleMode } = useTheme();
  const [localConfig, setLocalConfig] = useState(themeConfig);
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const handleSave = () => {
    updateTheme(localConfig);
  };

  const handleReset = () => {
    const defaultTheme = {
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
      mode: 'light' as const,
      borderRadius: 8,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    };
    setLocalConfig(defaultTheme);
    updateTheme(defaultTheme);
  };

  const fontOptions = [
    { value: '"Roboto", "Helvetica", "Arial", sans-serif', label: 'Roboto' },
    { value: '"Inter", sans-serif', label: 'Inter' },
    { value: '"Poppins", sans-serif', label: 'Poppins' },
    { value: '"Open Sans", sans-serif', label: 'Open Sans' },
    { value: '"Montserrat", sans-serif', label: 'Montserrat' },
    { value: '"Source Sans Pro", sans-serif', label: 'Source Sans Pro' },
  ];

  const presetColors = [
    { name: 'Blue', primary: '#1976d2', secondary: '#dc004e' },
    { name: 'Green', primary: '#2e7d32', secondary: '#ed6c02' },
    { name: 'Purple', primary: '#9c27b0', secondary: '#2e7d32' },
    { name: 'Orange', primary: '#ed6c02', secondary: '#9c27b0' },
    { name: 'Red', primary: '#d32f2f', secondary: '#1976d2' },
    { name: 'Teal', primary: '#00695c', secondary: '#d32f2f' },
  ];

  const handlePresetSelect = (preset: typeof presetColors[0]) => {
    const newConfig = {
      ...localConfig,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
    };
    setLocalConfig(newConfig);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          Theme Customization
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ResetIcon />}
            onClick={handleReset}
          >
            Reset to Default
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {/* Theme Mode */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Theme Mode
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={localConfig.mode === 'dark'}
                  onChange={(e) => {
                    const newMode = e.target.checked ? 'dark' : 'light';
                    setLocalConfig({ ...localConfig, mode: newMode });
                    toggleMode();
                  }}
                />
              }
              label={`${localConfig.mode === 'dark' ? 'Dark' : 'Light'} Mode`}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Toggle between light and dark theme modes
            </Typography>
          </Paper>
        </Grid>

        {/* Font Family */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Font Family
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Font</InputLabel>
              <Select
                value={localConfig.fontFamily}
                label="Font"
                onChange={(e) => setLocalConfig({ ...localConfig, fontFamily: e.target.value })}
              >
                {fontOptions.map((font) => (
                  <MenuItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Choose the font family for the entire application
            </Typography>
          </Paper>
        </Grid>

        {/* Border Radius */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Border Radius
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={localConfig.borderRadius}
                onChange={(_, value) => setLocalConfig({ ...localConfig, borderRadius: value as number })}
                min={0}
                max={20}
                step={1}
                marks={[
                  { value: 0, label: '0px' },
                  { value: 4, label: '4px' },
                  { value: 8, label: '8px' },
                  { value: 12, label: '12px' },
                  { value: 16, label: '16px' },
                  { value: 20, label: '20px' },
                ]}
                valueLabelDisplay="on"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Adjust the corner roundness of components ({localConfig.borderRadius}px)
            </Typography>
          </Paper>
        </Grid>

        {/* Color Presets */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Color Presets
            </Typography>
            <Grid container spacing={2}>
              {presetColors.map((preset) => (
                <Grid
                  key={preset.name}
                  size={{
                    xs: 6,
                    sm: 4,
                    md: 2
                  }}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: 
                        localConfig.primaryColor === preset.primary ? '2px solid' : '1px solid',
                      borderColor: 
                        localConfig.primaryColor === preset.primary ? 'primary.main' : 'divider',
                      '&:hover': {
                        boxShadow: 2,
                      },
                    }}
                    onClick={() => handlePresetSelect(preset)}
                  >
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: preset.primary,
                            mr: 1,
                          }}
                        />
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: preset.secondary,
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{preset.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Primary Color */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Primary Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: localConfig.primaryColor,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
              />
              <Typography variant="body1">{localConfig.primaryColor}</Typography>
            </Box>
            {showPrimaryPicker && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker
                  color={localConfig.primaryColor}
                  onChange={(color) => setLocalConfig({ ...localConfig, primaryColor: color })}
                />
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              Main brand color used for buttons, links, and highlights
            </Typography>
          </Paper>
        </Grid>

        {/* Secondary Color */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Secondary Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: localConfig.secondaryColor,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
              />
              <Typography variant="body1">{localConfig.secondaryColor}</Typography>
            </Box>
            {showSecondaryPicker && (
              <Box sx={{ mb: 2 }}>
                <HexColorPicker
                  color={localConfig.secondaryColor}
                  onChange={(color) => setLocalConfig({ ...localConfig, secondaryColor: color })}
                />
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              Secondary accent color for floating action buttons and selections
            </Typography>
          </Paper>
        </Grid>

        {/* Preview */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: `${localConfig.borderRadius}px`,
                fontFamily: localConfig.fontFamily,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontFamily: localConfig.fontFamily }}>
                Sample Component
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: localConfig.primaryColor,
                    borderRadius: `${localConfig.borderRadius}px`,
                    fontFamily: localConfig.fontFamily,
                    '&:hover': {
                      backgroundColor: localConfig.primaryColor + 'CC',
                    },
                  }}
                >
                  Primary Button
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: localConfig.secondaryColor,
                    borderRadius: `${localConfig.borderRadius}px`,
                    fontFamily: localConfig.fontFamily,
                    '&:hover': {
                      backgroundColor: localConfig.secondaryColor + 'CC',
                    },
                  }}
                >
                  Secondary Button
                </Button>
              </Box>
              <Card
                sx={{
                  borderRadius: `${localConfig.borderRadius}px`,
                  maxWidth: 300,
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontFamily: localConfig.fontFamily }}>
                    This is a preview of how your theme will look with the current settings.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Theme; 