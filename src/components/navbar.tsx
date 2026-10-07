"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard, LogOut, Loader2 } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  const isAuthenticated = status === "authenticated" && !!session?.user;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD3] shadow-sm shadow-[#2B1D1C]/5 py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            id="nav-brand-link"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D5D60] to-[#3C6E71] flex items-center justify-center shadow-md shadow-[#2D5D60]/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg tracking-tight text-[#2B1D1C] group-hover:text-[#2D5D60] transition-colors">
                Portfolify
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B5755]">
            <Link
              href="/#features"
              className="hover:text-[#2B1D1C] transition-colors duration-150"
              id="nav-link-features"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-[#2B1D1C] transition-colors duration-150"
              id="nav-link-how-it-works"
            >
              How It Works
            </Link>
            <Link
              href="/#templates"
              className="hover:text-[#2B1D1C] transition-colors duration-150"
              id="nav-link-templates"
            >
              Templates
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-[#2B1D1C] transition-colors duration-150"
              id="nav-link-pricing"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5D60] hover:text-[#22484A] px-3 py-2 transition-colors cursor-pointer"
                  id="nav-dashboard-btn"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#FAF0F2] hover:bg-[#F5CCD4] text-[#9B4D60] border border-[#EAD2D8] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60"
                  id="nav-logout-btn"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LogOut className="w-3.5 h-3.5" />
                  )}
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#52413F] hover:text-[#2B1D1C] px-3 py-2 transition-colors cursor-pointer"
                  id="nav-login-btn"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#2D5D60] hover:bg-[#22484A] text-white shadow-sm shadow-[#2D5D60]/20 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  id="nav-get-started-btn"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#F3ECE0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5D60]"
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border border-[#E8DFD3] bg-[#FFFFFF]/98 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-[#2B1D1C]/8 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-3 text-base font-medium text-[#2B1D1C]">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#templates"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="pt-4 border-t border-[#E8DFD3] flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#2D5D60] text-white text-sm font-medium shadow-md transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FAF0F2] text-[#9B4D60] hover:bg-[#F5CCD4] border border-[#EAD2D8] text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-[#4A3B39] hover:bg-[#FAF7F2] text-sm font-medium transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#2D5D60] hover:bg-[#22484A] text-white font-medium text-sm shadow-md transition-colors"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
