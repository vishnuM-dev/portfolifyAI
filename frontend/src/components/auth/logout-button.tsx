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
      "px-4 py-2.5 bg-[#FAF0F2] text-[#9B4D60] hover:bg-[#F5CCD4] border border-[#EAD2D8]",
    outline:
      "px-4 py-2 bg-transparent text-[#52413F] hover:text-[#2B1D1C] hover:bg-[#F3ECE0] border border-[#E8DFD3]",
    text: "p-0 text-[#6B5755] hover:text-[#9B4D60] bg-transparent",
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
        <Loader2 className="w-4 h-4 animate-spin text-[#9B4D60]" />
      ) : (
        <LogOut className="w-4 h-4 text-[#9B4D60]" />
      )}
      <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
