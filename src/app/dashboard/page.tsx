import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Sparkles, Plus, CheckCircle2, ShieldCheck, Mail, User as UserIcon } from "lucide-react";

export const metadata = {
  title: "Dashboard — Portfolify AI",
  description: "Manage your professional AI-generated portfolios and account settings.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const userInitials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C]">
      {/* Dashboard Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD3] shadow-sm shadow-[#2B1D1C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" id="dashboard-home-link">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2D5D60] to-[#3C6E71] flex items-center justify-center shadow-md shadow-[#2D5D60]/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight text-[#2B1D1C]">
                Portfolify
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                AI
              </span>
            </div>
          </Link>

          {/* User info and Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#2D5D60] text-white text-xs font-bold flex items-center justify-center">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#2B1D1C] leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-[#6B5755] leading-none mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5D60] to-[#1E3F41] text-white p-6 sm:p-10 shadow-xl shadow-[#2D5D60]/20">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-[#F5EFE6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#BDE0CB]" />
              <span>Real MongoDB Authentication Active</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user.name || "Creator"} 👋
            </h1>

            <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed">
              Your professional portfolio starts here. In future steps, you will be able to upload your resume and generate a stunning personalized portfolio in seconds.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9B4D60] hover:bg-[#853D4E] text-white font-semibold text-sm shadow-md transition-all cursor-pointer active:scale-[0.98]"
                id="create-portfolio-btn"
              >
                <Plus className="w-4 h-4" />
                <span>Create My Portfolio</span>
              </button>
            </div>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#FAF0F2]/10 blur-3xl pointer-events-none" />
        </section>

        {/* User Session Details Card */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Authenticated Account Card */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] text-[#9B4D60] flex items-center justify-center border border-[#EAD2D8]">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2B1D1C]">Account Details</h3>
                <p className="text-xs text-[#6B5755]">Authenticated Session</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8DFD3] text-xs">
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Name:</span>
                <span className="font-semibold text-[#2B1D1C]">{user.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Email:</span>
                <span className="font-semibold text-[#2B1D1C]">{user.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Role:</span>
                <span className="font-semibold text-[#2D5D60] capitalize">
                  {user.role || "user"}
                </span>
              </div>
            </div>
          </div>

          {/* Security & Verification Card */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#2F6141] flex items-center justify-center border border-[#BDE0CB]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2B1D1C]">Security Status</h3>
                <p className="text-xs text-[#6B5755]">Password Protected</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8DFD3] text-xs">
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Password Hashing:</span>
                <span className="font-semibold text-[#2F6141]">bcryptjs (12 rounds)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Session Provider:</span>
                <span className="font-semibold text-[#2B1D1C]">Auth.js / NextAuth</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B5755]">Storage:</span>
                <span className="font-semibold text-[#2B1D1C]">MongoDB Atlas</span>
              </div>
            </div>
          </div>

          {/* Next Step / Overview Card */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#2D5D60] flex items-center justify-center border border-[#E8DFD3]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2B1D1C]">Active Portfolios</h3>
                <p className="text-xs text-[#6B5755]">0 Created</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8DFD3] text-xs">
              <p className="text-[#6B5755] leading-relaxed">
                Step 4 authentication is successfully verified. The portfolio generator and resume parser will be configured in upcoming steps.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
