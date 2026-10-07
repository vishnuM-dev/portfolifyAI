export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  database: "connected" | "disconnected" | "connecting" | "uninitialized";
  timestamp: string;
}
