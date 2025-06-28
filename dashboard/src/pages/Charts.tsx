import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  ScatterChart,
  Scatter,
} from 'recharts';

const Charts: React.FC = () => {
  const [chartType, setChartType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('6months');

  // Sample data for different chart types
  const salesData = [
    { month: 'Jan', sales: 4000, profit: 2400, expenses: 2400 },
    { month: 'Feb', sales: 3000, profit: 1398, expenses: 2210 },
    { month: 'Mar', sales: 2000, profit: 9800, expenses: 2290 },
    { month: 'Apr', sales: 2780, profit: 3908, expenses: 2000 },
    { month: 'May', sales: 1890, profit: 4800, expenses: 2181 },
    { month: 'Jun', sales: 2390, profit: 3800, expenses: 2500 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#0088FE' },
    { name: 'Mobile', value: 300, color: '#00C49F' },
    { name: 'Tablet', value: 300, color: '#FFBB28' },
    { name: 'Other', value: 200, color: '#FF8042' },
  ];

  const radarData = [
    { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Reliability', A: 86, B: 130, fullMark: 150 },
    { subject: 'Scalability', A: 99, B: 100, fullMark: 150 },
    { subject: 'Usability', A: 85, B: 90, fullMark: 150 },
    { subject: 'Features', A: 65, B: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 4000, newUsers: 400 },
    { month: 'Feb', users: 4300, newUsers: 300 },
    { month: 'Mar', users: 4600, newUsers: 300 },
    { month: 'Apr', users: 5200, newUsers: 600 },
    { month: 'May', users: 5800, newUsers: 600 },
    { month: 'Jun', users: 6500, newUsers: 700 },
  ];

  const revenueData = [
    { quarter: 'Q1', revenue: 15000, target: 18000 },
    { quarter: 'Q2', revenue: 22000, target: 20000 },
    { quarter: 'Q3', revenue: 18000, target: 19000 },
    { quarter: 'Q4', revenue: 25000, target: 23000 },
  ];

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
        <Bar dataKey="target" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Product A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Product B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );

  const renderComposedChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="expenses" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="profit" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="sales" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderScatterChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={scatterData}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );

  const chartComponents = {
    line: { title: 'Sales & Profit Trends', component: renderLineChart() },
    area: { title: 'User Growth Over Time', component: renderAreaChart() },
    bar: { title: 'Revenue vs Target', component: renderBarChart() },
    pie: { title: 'Traffic Sources', component: renderPieChart() },
    radar: { title: 'Product Comparison', component: renderRadarChart() },
    composed: { title: 'Sales Performance', component: renderComposedChart() },
    scatter: { title: 'Performance Metrics', component: renderScatterChart() },
  };

  const filteredCharts = chartType === 'all' 
    ? Object.entries(chartComponents) 
    : Object.entries(chartComponents).filter(([key]) => key === chartType);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Charts & Analytics
      </Typography>
      {/* Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <FormControl fullWidth>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartType}
                label="Chart Type"
                onChange={(e) => setChartType(e.target.value)}
              >
                <MenuItem value="all">All Charts</MenuItem>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="area">Area Chart</MenuItem>
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="pie">Pie Chart</MenuItem>
                <MenuItem value="radar">Radar Chart</MenuItem>
                <MenuItem value="composed">Composed Chart</MenuItem>
                <MenuItem value="scatter">Scatter Chart</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="1month">Last Month</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      {/* Charts Grid */}
      <Grid container spacing={3}>
        {filteredCharts.map(([key, { title, component }]) => (
          <Grid
            key={key}
            size={{
              xs: 12,
              md: 6,
              lg: chartType === 'all' ? 6 : 12
            }}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              {component}
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Summary Statistics */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h5" component="div">
                $80,000
              </Typography>
              <Typography variant="body2" color="success.main">
                +12% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5" component="div">
                6,500
              </Typography>
              <Typography variant="body2" color="success.main">
                +8% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h5" component="div">
                24.8%
              </Typography>
              <Typography variant="body2" color="error.main">
                -2% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg Order Value
              </Typography>
              <Typography variant="h5" component="div">
                $125
              </Typography>
              <Typography variant="body2" color="success.main">
                +5% from last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts; 