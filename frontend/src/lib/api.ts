import { ApiResponse } from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Standard fetch wrapper communicating with Express backend at http://localhost:5000/api
 * Ensures credentials (cookies) and JSON headers are configured for all requests.
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Enables HTTP-only cookie transport across origins
    });

    const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Request failed with status ${response.status}`,
      };
    }

    return (
      data || {
        success: true,
      }
    );
  } catch {
    return {
      success: false,
      message: "Unable to connect to the backend server. Please verify backend is running on port 5000.",
    };
  }
}

export default apiRequest;
