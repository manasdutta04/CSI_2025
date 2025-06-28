import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Storage as StorageIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      desktop: true,
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analytics: true,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
    },
  });

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    department: 'IT',
  });

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Settings
      </Typography>
      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Profile Settings</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Department"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                fullWidth
              />
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Notifications</Typography>
            </Box>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive notifications via email"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Push Notifications"
                  secondary="Receive push notifications in browser"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="SMS Notifications"
                  secondary="Receive notifications via SMS"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Desktop Notifications"
                  secondary="Show desktop notifications"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.desktop}
                    onChange={(e) => handleSettingChange('notifications', 'desktop', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Privacy Settings */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Privacy & Security</Typography>
            </Box>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Profile Visibility"
                  secondary="Make your profile visible to other users"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Data Sharing"
                  secondary="Share usage data with third parties"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Analytics"
                  secondary="Allow collection of analytics data"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.privacy.analytics}
                    onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* System Information */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StorageIcon sx={{ mr: 1 }} />
              <Typography variant="h6">System Information</Typography>
            </Box>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Application Version"
                  secondary="1.0.0"
                />
                <Chip label="Latest" color="success" size="small" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last Updated"
                  secondary="December 27, 2024"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Storage Used"
                  secondary="2.3 GB of 10 GB"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Server Status"
                  secondary="All systems operational"
                />
                <Chip label="Online" color="success" size="small" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="outlined">Export Data</Button>
              <Button variant="outlined">Import Settings</Button>
              <Button variant="outlined">Clear Cache</Button>
              <Button variant="outlined">Reset to Defaults</Button>
              <Button variant="outlined" color="error">
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Support */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Support & Help
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Need help? Contact our support team or check out the documentation.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained">Contact Support</Button>
              <Button variant="outlined">Documentation</Button>
              <Button variant="outlined">Report Issue</Button>
              <Button variant="outlined">Feature Request</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 