"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthInput } from "@/components/auth/auth-input";
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, KeyRound } from "lucide-react";
import { apiRequest } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ token?: string; password?: string; confirmPassword?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { token?: string; password?: string; confirmPassword?: string } = {};

    if (!token.trim()) {
      newErrors.token = "Reset token is required.";
    }

    if (!password) {
      newErrors.password = "Please enter a new password.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: token.trim(), password }),
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || "Failed to reset password. The link may have expired.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-[#ECF5EF] border border-[#BDE0CB] flex items-center justify-center text-[#447250] mx-auto shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-[#2B1D15] font-bold">
            Password reset complete!
          </p>
          <p className="text-xs text-[#6D594D] leading-relaxed max-w-sm mx-auto">
            Your password has been successfully updated. You can now sign in with your new credentials.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            id="reset-password-login-btn"
          >
            <span>Proceed to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {serverError && (
        <div className="p-3 rounded-xl bg-[#FDF0EE] border border-[#F9CBC6] text-[#C03E31] text-xs flex items-start gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C03E31]" />
          <span>{serverError}</span>
        </div>
      )}

      {!tokenFromUrl && (
        <AuthInput
          id="reset-token"
          label="Reset Token"
          type="text"
          placeholder="Paste your reset token"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            if (errors.token) setErrors((prev) => ({ ...prev, token: undefined }));
            if (serverError) setServerError(null);
          }}
          error={errors.token}
        />
      )}

      <AuthInput
        id="reset-new-password"
        label="New Password"
        isPassword
        placeholder="At least 8 characters"
        autoComplete="new-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          if (serverError) setServerError(null);
        }}
        error={errors.password}
      />

      <AuthInput
        id="reset-confirm-password"
        label="Confirm New Password"
        isPassword
        placeholder="Re-enter your new password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          if (serverError) setServerError(null);
        }}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-3 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D47A41]/20 hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
        id="reset-password-submit-btn"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Updating Password...</span>
          </>
        ) : (
          <>
            <span>Update Password</span>
            <KeyRound className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#6D594D] pt-3 border-t border-[#E6DACB]">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-[#D47A41] font-bold hover:text-[#BF6A34] transition-colors inline-flex items-center gap-1"
          id="reset-password-login-link"
        >
          <span>Back to Sign In</span>
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heading="Set New Password"
      subheading="Create a new secure password for your Portfolify AI account."
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#D47A41]" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
