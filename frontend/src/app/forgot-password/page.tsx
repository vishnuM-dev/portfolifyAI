"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthInput } from "@/components/auth/auth-input";
import { ArrowLeft, MailCheck, Send, Loader2, KeyRound } from "lucide-react";
import { apiRequest } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [devResetToken, setDevResetToken] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest<{ resetToken?: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      if (res.success) {
        const token = (res.data as any)?.resetToken || (res as any)?.resetToken;
        if (token) {
          setDevResetToken(token);
        }
        setIsSubmitted(true);
      } else {
        setError(res.message || "Failed to process request. Please try again.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <div className="w-14 h-14 rounded-2xl bg-[#ECF5EF] border border-[#BDE0CB] flex items-center justify-center text-[#447250] mx-auto shadow-xs">
            <MailCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-[#2B1D15] font-bold">
              Instructions sent to <span className="text-[#D47A41] font-mono">{email}</span>
            </p>
            <p className="text-xs text-[#6D594D] leading-relaxed max-w-sm mx-auto">
              If an account exists for this email, you&apos;ll receive password reset instructions shortly.
            </p>
          </div>

          {devResetToken && (
            <div className="p-3.5 rounded-xl bg-[#FDF1E8] border border-[#F3CDB7] text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D47A41]">
                <KeyRound className="w-4 h-4" />
                <span>Development Reset Link Ready</span>
              </div>
              <p className="text-xs text-[#6D594D]">
                Use this token to set a new password:
              </p>
              <Link
                href={`/reset-password?token=${devResetToken}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs shadow-sm transition-all"
                id="forgot-password-direct-reset-btn"
              >
                <span>Proceed to Reset Password</span>
              </Link>
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] font-semibold text-xs sm:text-sm border border-[#E6DACB] shadow-xs transition-all cursor-pointer"
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
            className="w-full mt-2 py-3 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D47A41]/20 hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
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

          <p className="text-center text-xs text-[#6D594D] pt-3 border-t border-[#E6DACB]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#D47A41] font-bold hover:text-[#BF6A34] transition-colors inline-flex items-center gap-1"
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
