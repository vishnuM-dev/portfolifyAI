"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Loader2 } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "outline" | "text";
}

export function LogoutButton({ className = "", variant = "default" }: LogoutButtonProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    router.push("/login");
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer disabled:opacity-60 active:scale-[0.98]";

  const variantStyles = {
    default:
      "px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FDF0EE] text-[#C03E31] hover:bg-[#FBE4E2] border border-[#F7CBC7]",
    outline:
      "px-3 sm:px-4 py-2 bg-transparent text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8] border border-[#E6DACB]",
    text: "p-0 text-[#6D594D] hover:text-[#C03E31] bg-transparent",
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      id="dashboard-logout-btn"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#C03E31]" />
      ) : (
        <LogOut className="w-4 h-4 text-[#C03E31]" />
      )}
      <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
