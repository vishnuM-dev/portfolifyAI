"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { UserDTO, AuthContextType } from "@/types/auth";
import { apiRequest, setStoredToken } from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from Express backend (/api/auth/me)
  const refreshUser = useCallback(async () => {
    try {
      const response = await apiRequest<UserDTO>("/auth/me");
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Login handler
  const login = async (email: string, password: string) => {
    const response = await apiRequest<UserDTO>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.user) {
      if (response.token) {
        setStoredToken(response.token);
      }
      setUser(response.user);
      return { success: true };
    }

    return {
      success: false,
      message: response.message || "Invalid email or password.",
    };
  };

  // Register handler
  const register = async (name: string, email: string, password: string) => {
    const response = await apiRequest<UserDTO>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (response.success && response.user) {
      if (response.token) {
        setStoredToken(response.token);
      }
      setUser(response.user);
      return { success: true };
    }

    return {
      success: false,
      message: response.message || "Registration failed.",
    };
  };

  // Logout handler
  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch {
      // Clear state regardless
    } finally {
      setStoredToken(null);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
