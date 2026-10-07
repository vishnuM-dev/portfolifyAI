"use client";

import React, { useState } from "react";

interface SocialLoginButtonProps {
  label?: string;
  onClick?: () => void;
}

export function SocialLoginButton({
  label = "Continue with Google",
  onClick,
}: SocialLoginButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick?.();
    setTimeout(() => setClicked(false), 1500);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2B1D1C] text-xs sm:text-sm font-semibold border border-[#E8DFD3] hover:border-[#D1C4B4] transition-all duration-150 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#2D5D60]/30 shadow-xs"
        id="google-auth-btn"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.3l3.7 2.9C6.2 7.3 8.8 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 10.6 0 12s.6 2.7 1.6 4.7l3.7-1.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.2L1.6 16C3.5 19.7 7.4 23 12 23z"
          />
        </svg>
        <span>{label}</span>
      </button>

      {clicked && (
        <p className="text-[11px] text-center text-[#2D5D60] animate-in fade-in duration-150 font-mono font-medium">
          Google OAuth provider integration is coming in a future update.
        </p>
      )}
    </div>
  );
}
