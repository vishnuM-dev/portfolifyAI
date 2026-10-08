"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthInput } from "@/components/auth/auth-input";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter a password.";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
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
      const result = await register(
        fullName.trim(),
        email.toLowerCase().trim(),
        password
      );

      if (!result.success) {
        setServerError(result.message || "Registration failed.");
        setIsLoading(false);
        return;
      }

      // Auto-redirect to dashboard on successful account creation
      router.push("/dashboard");
    } catch {
      setServerError("Unable to complete registration. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Create your portfolio"
      subheading="Build a professional online presence from the experience you already have."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Server error banner */}
        {serverError && (
          <div className="p-3 rounded-xl bg-[#FDF0EE] border border-[#F9CBC6] text-[#C03E31] text-xs flex items-start gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C03E31]" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Full Name input */}
        <AuthInput
          id="register-fullname"
          label="Full Name"
          type="text"
          placeholder="Alex Chen"
          autoComplete="name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName)
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            if (serverError) setServerError(null);
          }}
          error={errors.fullName}
        />

        {/* Email input */}
        <AuthInput
          id="register-email"
          label="Email"
          type="email"
          placeholder="alex@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
            if (serverError) setServerError(null);
          }}
          error={errors.email}
        />

        {/* Password input */}
        <AuthInput
          id="register-password"
          label="Password"
          isPassword
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
            if (serverError) setServerError(null);
          }}
          error={errors.password}
        />

        {/* Confirm Password input */}
        <AuthInput
          id="register-confirm-password"
          label="Confirm Password"
          isPassword
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            if (serverError) setServerError(null);
          }}
          error={errors.confirmPassword}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D47A41]/20 hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
          id="register-submit-btn"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E6DACB]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FFFDF9] px-3 text-[#9E8C7E] font-mono text-[10px] font-bold">
              OR
            </span>
          </div>
        </div>

        {/* Google OAuth Button Placeholder */}
        <SocialLoginButton label="Sign up with Google" />

        {/* Link to Login */}
        <p className="text-center text-xs text-[#6D594D] pt-3 border-t border-[#E6DACB]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#D47A41] font-bold hover:text-[#BF6A34] transition-colors"
            id="register-signin-link"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
