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

  const isPasswordField = Boolean(isPassword || type === "password");
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#2B1D15] select-none"
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
          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EC] text-sm text-[#2B1D15] placeholder-[#9E8C7E] border transition-all duration-150 focus:outline-none focus:ring-2 ${
            error
              ? "border-[#C03E31] focus:border-[#C03E31] focus:ring-[#C03E31]/20"
              : "border-[#E6DACB] hover:border-[#D5C3AE] focus:border-[#D47A41] focus:ring-[#D47A41]/20 focus:bg-[#FFFDF9]"
          } ${isPasswordField ? "pr-10" : ""} ${className}`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8C7E] hover:text-[#2B1D15] p-1 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-[#D47A41] cursor-pointer"
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
          className="text-xs text-[#C03E31] flex items-center gap-1 mt-1 animate-in fade-in duration-150 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
