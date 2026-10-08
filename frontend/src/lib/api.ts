import { ApiResponse } from "@/types/auth";

export function getApiBaseUrl(): string {
  // In the browser, dynamically resolve to the current host so other laptops/devices on LAN/Wi-Fi (e.g. 192.168.1.12) connect seamlessly
  if (typeof window !== "undefined") {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    // If NEXT_PUBLIC_API_URL is a dedicated remote production URL, use that
    if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
      return envUrl;
    }
    // Automatically match the current browser's IP/hostname (whether localhost, 192.168.x.x, etc.)
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:5000/api`;
  }

  // Server-side rendering fallback
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
}

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem("portfolify_token");
    } catch {
      return null;
    }
  }
  return null;
}

export function setStoredToken(token: string | null): void {
  if (typeof window !== "undefined") {
    try {
      if (token) {
        localStorage.setItem("portfolify_token", token);
      } else {
        localStorage.removeItem("portfolify_token");
      }
    } catch {
      // Ignore storage errors in restricted iframe/private contexts
    }
  }
}

/**
 * Standard fetch wrapper communicating with Express backend.
 * Ensures credentials (cookies), Authorization Bearer fallback, and JSON headers are configured.
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getStoredToken();
  if (token && !headers["Authorization"] && !headers["authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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
