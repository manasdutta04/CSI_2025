# React Admin Dashboard

A comprehensive, modern admin dashboard built with React, TypeScript, and Material-UI. Features customizable themes, interactive data tables, beautiful charts, calendar management, and a Kanban board for project management.

## ✨ Features

### 🎨 **Customizable Themes**
- Light and dark mode support
- Custom color schemes with color picker
- Adjustable border radius and typography
- Preset theme collections
- Real-time theme preview

### 📊 **Interactive Charts & Analytics**
- Line, Area, Bar, Pie, Radar, and Scatter charts
- Composed charts with multiple data types
- Interactive tooltips and legends
- Responsive design for all screen sizes
- Data filtering and time range selection

### 📋 **Advanced Data Tables**
- Sortable and filterable columns
- Pagination and row selection
- Inline editing and CRUD operations
- Export capabilities
- Custom cell renderers

### 📅 **Calendar Management**
- Monthly calendar view
- Event creation and editing
- Drag and drop support
- Color-coded events
- Today's events sidebar
- Upcoming events overview

### 📌 **Kanban Board**
- Drag and drop task management
- Multiple columns (To Do, In Progress, Review, Done)
- Task priority and labels
- Assignee management
- Real-time updates

### ⚙️ **Settings & Configuration**
- User profile management
- Notification preferences
- Privacy and security settings
- System information
- Quick actions and support

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.tsx          # Top navigation bar
│       ├── Sidebar.tsx         # Side navigation menu
│       └── Layout.tsx          # Main layout wrapper
├── contexts/
│   └── ThemeContext.tsx        # Theme management context
├── pages/
│   ├── Dashboard.tsx           # Main dashboard with stats
│   ├── Tables.tsx              # Data tables page
│   ├── Charts.tsx              # Charts and analytics
│   ├── Calendar.tsx            # Calendar management
│   ├── Kanban.tsx              # Kanban board
│   ├── Theme.tsx               # Theme customization
│   └── Settings.tsx            # Application settings
├── types/
│   └── index.ts                # TypeScript type definitions
└── App.tsx                     # Main application component
```

## 🛠️ Built With

- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript for better development experience
- **Material-UI (MUI)** - React UI framework with beautiful components
- **React Router** - Declarative routing for React applications
- **Recharts** - Composable charting library for React
- **@hello-pangea/dnd** - Beautiful and accessible drag and drop
- **dayjs** - Fast 2kB alternative to Moment.js
- **react-colorful** - Tiny color picker component

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly across:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🎯 Key Features Showcase

### Dashboard Overview
- Real-time statistics cards
- Interactive charts with multiple data series
- Recent activities feed
- Revenue and user analytics

### Data Management
- Advanced data grid with sorting and filtering
- CRUD operations with inline editing
- Bulk actions and row selection
- Custom column rendering

### Visual Analytics
- 7 different chart types
- Interactive tooltips and legends
- Data filtering and time ranges
- Summary statistics cards

### Task Management
- Drag and drop Kanban board
- Task prioritization and labeling
- Team member assignments
- Progress tracking

## 🔧 Customization

### Theme Customization
1. Navigate to the Theme page
2. Adjust colors using the color picker
3. Modify border radius with the slider
4. Choose from preset color schemes
5. Toggle between light and dark modes

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update sidebar navigation in `src/components/Layout/Sidebar.tsx`

### Extending Components
All components are modular and easily extensible. Refer to the TypeScript interfaces in `src/types/index.ts` for data structures.

## 📊 Sample Data

The dashboard includes sample data for demonstration purposes:
- User statistics and growth metrics
- Sales and revenue data
- Calendar events
- Kanban tasks and assignments
- User profiles and activities

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on commits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Demo

A live demo is available at: [Demo URL]

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@example.com
- Documentation: [Docs URL]

---

**Happy Coding!** 🚀
