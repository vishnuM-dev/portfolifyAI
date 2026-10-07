"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthInput } from "@/components/auth/auth-input";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { ArrowRight, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registeredSuccess = searchParams.get("registered") === "true";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email.toLowerCase().trim(), password);

      if (!result.success) {
        setAuthError(result.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      // Successful login -> Navigate to Dashboard
      router.push("/dashboard");
    } catch {
      setAuthError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Registration Success notice if redirected from register */}
      {registeredSuccess && !authError && (
        <div className="p-3 rounded-xl bg-[#EAF4EE] border border-[#BDE0CB] text-[#2F6141] text-xs flex items-start gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#366B4A]" />
          <span>Account created successfully! Please sign in with your credentials.</span>
        </div>
      )}

      {/* Authentication error banner */}
      {authError && (
        <div className="p-3 rounded-xl bg-[#FDF2F4] border border-[#F5CCD4] text-[#9B4D60] text-xs flex items-start gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9B4D60]" />
          <span>{authError}</span>
        </div>
      )}

      {/* Email input */}
      <AuthInput
        id="login-email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          if (authError) setAuthError(null);
        }}
        error={errors.email}
      />

      {/* Password input with visibility toggle */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-xs font-semibold text-[#382624] select-none"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-[#2D5D60] font-semibold hover:text-[#22484A] transition-colors"
            id="login-forgot-password-link"
          >
            Forgot password?
          </Link>
        </div>

        <AuthInput
          id="login-password"
          label=""
          isPassword
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
            if (authError) setAuthError(null);
          }}
          error={errors.password}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 py-3 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2D5D60]/20 hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
        id="login-submit-btn"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E8DFD3]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#FFFFFF] px-3 text-[#7B6866] font-mono text-[10px] font-bold">
            OR
          </span>
        </div>
      </div>

      {/* Google OAuth Button Placeholder */}
      <SocialLoginButton label="Continue with Google" />

      {/* Link to Register */}
      <p className="text-center text-xs text-[#6B5755] pt-3 border-t border-[#E8DFD3]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#2D5D60] font-bold hover:text-[#22484A] transition-colors"
          id="login-create-account-link"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to continue building your professional portfolio."
    >
      <Suspense fallback={<div className="py-8 text-center text-xs text-[#6B5755]">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
