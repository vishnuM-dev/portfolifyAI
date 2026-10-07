"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthInput } from "@/components/auth/auth-input";
import { ArrowLeft, MailCheck, Send, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    // Simulated frontend reset link transmission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <AuthLayout
      heading={isSubmitted ? "Check your email" : "Reset your password"}
      subheading={
        isSubmitted
          ? "We sent password reset instructions to your inbox."
          : "Enter your email address and we'll help you get back into your account."
      }
    >
      {isSubmitted ? (
        /* Confirmation state after submission */
        <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF4EE] border border-[#BDE0CB] flex items-center justify-center text-[#366B4A] mx-auto shadow-xs">
            <MailCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-[#2B1D1C] font-bold">
              Instructions sent to <span className="text-[#2D5D60] font-mono">{email}</span>
            </p>
            <p className="text-xs text-[#6B5755] leading-relaxed max-w-sm mx-auto">
              If an account exists for this email, you&apos;ll receive password reset instructions shortly.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-xs text-[#6B5755]">
            Password reset email dispatch service will be connected in a future update.
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              id="forgot-password-back-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Initial request form */
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthInput
            id="forgot-password-email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            error={error}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2D5D60]/20 hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
            id="forgot-password-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#6B5755] pt-3 border-t border-[#E8DFD3]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#2D5D60] font-bold hover:text-[#22484A] transition-colors inline-flex items-center gap-1"
              id="forgot-password-signin-link"
            >
              <span>Back to Sign In</span>
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
