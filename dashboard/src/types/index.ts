export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  mode: 'light' | 'dark';
  borderRadius: number;
  fontFamily: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  dueDate?: Date;
  labels: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  color?: string;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
} 