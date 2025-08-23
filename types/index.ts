export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface DashboardStats {
  totalUsers: number;
  revenue: number;
  orders: number;
  growth: number;
}

export interface Activity {
  id: string;
  type: "user_registered" | "order_placed" | "system_maintenance";
  message: string;
  timestamp: Date;
  icon: string;
  color: string;
}
