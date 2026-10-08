"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard, LogOut, Loader2 } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 10) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollYRef.current;

      // Filter out micro-jitter
      if (Math.abs(diff) < 6) return;

      if (diff > 0 && currentScrollY > 60) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (diff < 0) {
        // Scrolling up -> reveal navbar
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-[#F8F3EC]/90 backdrop-blur-md border-b border-[#E6DACB] shadow-sm shadow-[#2B1D15]/5 py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
            id="nav-brand-link"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D47A41] to-[#E8955F] flex items-center justify-center shadow-md shadow-[#D47A41]/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#2B1D15] group-hover:text-[#D47A41] transition-colors">
                Portfolify
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#6D594D]">
            <Link
              href="/#features"
              className="hover:text-[#2B1D15] transition-colors duration-150 py-1"
              id="nav-link-features"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-[#2B1D15] transition-colors duration-150 py-1"
              id="nav-link-how-it-works"
            >
              How It Works
            </Link>
            <Link
              href="/#templates"
              className="hover:text-[#2B1D15] transition-colors duration-150 py-1"
              id="nav-link-templates"
            >
              Templates
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-[#2B1D15] transition-colors duration-150 py-1"
              id="nav-link-pricing"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D47A41] hover:text-[#BF6A34] px-3 py-2 transition-colors cursor-pointer"
                  id="nav-dashboard-btn"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#F5EDE3] hover:bg-[#EBE0D2] text-[#6D594D] border border-[#E6DACB] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60"
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
                  className="text-sm font-medium text-[#6D594D] hover:text-[#2B1D15] px-3 py-2 transition-colors cursor-pointer"
                  id="nav-login-btn"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white shadow-sm shadow-[#D47A41]/20 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
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
              className="p-2 rounded-xl text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#F3EBE0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-5 border border-[#E6DACB] bg-[#FFFDF9]/98 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xl shadow-[#2B1D15]/8 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 text-sm sm:text-base font-medium text-[#2B1D15]">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl hover:bg-[#F8F3EC] transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl hover:bg-[#F8F3EC] transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#templates"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl hover:bg-[#F8F3EC] transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl hover:bg-[#F8F3EC] transition-colors"
              >
                Pricing
              </Link>
            </div>
            <div className="pt-3 border-t border-[#E6DACB] flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D47A41] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard ({user?.name || "Account"})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F5EDE3] text-[#6D594D] hover:bg-[#EBE0D2] border border-[#E6DACB] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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
                    className="w-full text-center py-2.5 rounded-xl text-[#6D594D] hover:bg-[#F8F3EC] text-xs sm:text-sm font-semibold transition-colors border border-[#E6DACB]"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
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

