import axios from "axios";

// Base URL for the backend API
const API_BASE_URL = "http://localhost:3001";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token in headers
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// Authentication service
export const authService = {
  // Login function
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post("/auth/login", credentials);
      const { access_token, user } = response.data;
      
      // Store token and user info
      if (typeof window !== "undefined") {
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("Network error occurred");
    }
  },

  // Logout function
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false; // SSR check
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Check if current user has specific role
  hasRole(role: 'admin' | 'user'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  // Check if current user is admin
  isAdmin(): boolean {
    return this.hasRole('admin');
  },

  // Check if current user is regular user
  isUser(): boolean {
    return this.hasRole('user');
  },

  // Get token from localStorage
  getToken(): string | null {
    if (typeof window === "undefined") return null; // SSR check
    return localStorage.getItem("token");
  },
};

// Export the configured axios instance for other API calls
export { api };
