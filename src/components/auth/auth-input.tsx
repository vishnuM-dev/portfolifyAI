"use client";

import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function AuthInput({
  id,
  label,
  error,
  isPassword = false,
  className = "",
  type = "text",
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#382624] select-none"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] text-sm text-[#2B1D1C] placeholder-[#8C7A78] border transition-all duration-150 focus:outline-none focus:ring-2 ${
            error
              ? "border-[#B83A3A] focus:border-[#B83A3A] focus:ring-[#B83A3A]/20"
              : "border-[#E8DFD3] hover:border-[#D1C4B4] focus:border-[#2D5D60] focus:ring-[#2D5D60]/20 focus:bg-[#FFFFFF]"
          } ${isPassword ? "pr-10" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B6866] hover:text-[#2B1D1C] p-1 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-[#2D5D60] cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-[#B83A3A] flex items-center gap-1 mt-1 animate-in fade-in duration-150 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
