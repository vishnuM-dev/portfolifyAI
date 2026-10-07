export type UserRole = "user" | "admin";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  user?: UserDTO;
  token?: string;
  error?: string;
}

export interface AuthContextType {
  user: UserDTO | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
