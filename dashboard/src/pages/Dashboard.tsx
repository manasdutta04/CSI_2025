import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: 'Total Users',
      value: '12,459',
      change: '+12%',
      icon: <People />,
      color: '#1976d2',
    },
    {
      title: 'Total Revenue',
      value: '$48,945',
      change: '+8%',
      icon: <AttachMoney />,
      color: '#2e7d32',
    },
    {
      title: 'Total Orders',
      value: '1,847',
      change: '+15%',
      icon: <ShoppingCart />,
      color: '#ed6c02',
    },
    {
      title: 'Growth Rate',
      value: '24.5%',
      change: '+3%',
      icon: <TrendingUp />,
      color: '#9c27b0',
    },
  ];

  const lineData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 1398 },
    { name: 'Mar', users: 600, revenue: 9800 },
    { name: 'Apr', users: 800, revenue: 3908 },
    { name: 'May', users: 700, revenue: 4800 },
    { name: 'Jun', users: 900, revenue: 3800 },
  ];

  const barData = [
    { name: 'Mon', sales: 120 },
    { name: 'Tue', sales: 190 },
    { name: 'Wed', sales: 300 },
    { name: 'Thu', sales: 500 },
    { name: 'Fri', sales: 200 },
    { name: 'Sat', sales: 300 },
    { name: 'Sun', sales: 100 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#1976d2' },
    { name: 'Mobile', value: 300, color: '#2e7d32' },
    { name: 'Tablet', value: 200, color: '#ed6c02' },
    { name: 'Other', value: 100, color: '#9c27b0' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created new order',
      time: '2 minutes ago',
      avatar: 'JD',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated profile',
      time: '5 minutes ago',
      avatar: 'JS',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Completed task',
      time: '10 minutes ago',
      avatar: 'MJ',
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      action: 'Posted new comment',
      time: '15 minutes ago',
      avatar: 'SW',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={stat.change}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Line Chart */}
        <Grid
          size={{
            xs: 12,
            md: 8
          }}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Revenue & Users Trend
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#2e7d32" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Device Usage
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Bottom Row */}
      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid
          size={{
            xs: 12,
            md: 8
          }}>
          <Paper sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Sales
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Paper sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                      {activity.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <strong>{activity.user}</strong> {activity.action}
                      </Typography>
                    }
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 