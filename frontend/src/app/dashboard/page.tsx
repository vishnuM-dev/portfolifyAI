"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio } from "@/types/portfolio";
import { LogoutButton } from "@/components/auth/logout-button";
import { CreatePortfolioModal } from "@/components/portfolio/CreatePortfolioModal";
import {
  Sparkles,
  Plus,
  Edit3,
  Eye,
  Trash2,
  Layout,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  FileCode2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loadingPortfolios, setLoadingPortfolios] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Load portfolios from MongoDB
  const loadPortfolios = useCallback(async () => {
    try {
      setLoadingPortfolios(true);
      const res = await portfolioApi.getPortfolios();
      if (res.success && res.data?.portfolios) {
        setPortfolios(res.data.portfolios);
      }
    } catch {
      setActionError("Failed to load portfolios from database.");
    } finally {
      setLoadingPortfolios(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadPortfolios();
    }
  }, [user, loadPortfolios]);

  // Handle Publish / Unpublish
  const handleTogglePublish = async (portfolio: IPortfolio) => {
    setPublishingId(portfolio._id);
    setActionError(null);
    try {
      if (portfolio.status === "published") {
        const res = await portfolioApi.unpublishPortfolio(portfolio._id);
        if (res.success) {
          await loadPortfolios();
        } else {
          setActionError(res.message || "Failed to unpublish portfolio.");
        }
      } else {
        const res = await portfolioApi.publishPortfolio(portfolio._id);
        if (res.success) {
          await loadPortfolios();
        } else {
          setActionError(res.message || "Please complete required fields before publishing.");
        }
      }
    } catch {
      setActionError("An error occurred during status update.");
    } finally {
      setPublishingId(null);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    setActionError(null);
    try {
      const res = await portfolioApi.deletePortfolio(deleteConfirmId);
      if (res.success) {
        setPortfolios((prev) => prev.filter((p) => p._id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } else {
        setActionError(res.message || "Failed to delete portfolio.");
      }
    } catch {
      setActionError("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Copy Link
  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  if (authLoading || (!user && authLoading)) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
          <p className="text-xs text-[#6B5755] font-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userInitials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C]">
      {/* Top Navigation */}
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

          {/* User profile badge & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-2xs">
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

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Welcome & Quick Action Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DFD3]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2B1D1C] tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5755] mt-1">
              Create, edit, and publish high-impact personal portfolio websites.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#2D5D60]/20 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] shrink-0"
            id="create-portfolio-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Create Portfolio</span>
          </button>
        </section>

        {/* Global Action Error Alert */}
        {actionError && (
          <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F5CCD4] text-[#9B4D60] text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{actionError}</span>
          </div>
        )}

        {/* Portfolios Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-[#2D5D60]" />
              <h2 className="text-base sm:text-lg font-bold text-[#2B1D1C]">My Portfolios</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] font-semibold border border-[#EAD2D8]">
                {portfolios.length}
              </span>
            </div>
          </div>

          {loadingPortfolios ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60] mx-auto" />
              <p className="text-xs text-[#6B5755]">Loading your portfolios from database...</p>
            </div>
          ) : portfolios.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl bg-[#FFFFFF] border-2 border-dashed border-[#E8DFD3] p-10 sm:p-14 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF0F2] text-[#9B4D60] flex items-center justify-center mx-auto border border-[#EAD2D8]">
                <Layout className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#2B1D1C]">
                  You haven&apos;t created a portfolio yet
                </h3>
                <p className="text-xs text-[#6B5755] max-w-sm mx-auto leading-relaxed">
                  Start from scratch or upload your resume (PDF/DOCX) to automatically generate structured experience and projects.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Create your first portfolio</span>
              </button>
            </div>
          ) : (
            /* Portfolio Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio._id}
                  className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md hover:border-[#2D5D60]/40 transition-all"
                >
                  <div className="space-y-3">
                    {/* Status & Template Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          portfolio.status === "published"
                            ? "bg-[#EAF4EE] text-[#2F6141] border border-[#BDE0CB]"
                            : "bg-[#FAF7F2] text-[#7B6866] border border-[#E8DFD3]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            portfolio.status === "published" ? "bg-[#366B4A]" : "bg-[#7B6866]"
                          }`}
                        />
                        <span>{portfolio.status}</span>
                      </span>

                      <span className="text-[11px] font-mono text-[#6B5755] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E8DFD3] capitalize">
                        {portfolio.template} Template
                      </span>
                    </div>

                    {/* Title & Headline */}
                    <div>
                      <h3 className="text-base font-bold text-[#2B1D1C] truncate">
                        {portfolio.profile?.name || "Untitled Portfolio"}
                      </h3>
                      <p className="text-xs text-[#2D5D60] font-medium truncate mt-0.5">
                        {portfolio.profile?.headline || "Professional Portfolio"}
                      </p>
                    </div>

                    {/* Stats & Meta summary */}
                    <div className="flex items-center gap-3 text-xs text-[#6B5755] pt-1">
                      <span>{portfolio.skills?.length || 0} Skills</span>
                      <span>•</span>
                      <span>{portfolio.experience?.length || 0} Exp</span>
                      <span>•</span>
                      <span>{portfolio.projects?.length || 0} Projects</span>
                    </div>

                    {/* Public URL row (if published) */}
                    {portfolio.status === "published" && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-xs">
                          <span className="font-mono text-[11px] text-[#2D5D60] truncate max-w-[170px]">
                            /p/{portfolio.slug}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(portfolio.slug)}
                              className="p-1 text-[#6B5755] hover:text-[#2B1D1C] rounded transition-colors"
                              title="Copy Public Link"
                            >
                              {copiedSlug === portfolio.slug ? (
                                <Check className="w-3.5 h-3.5 text-[#366B4A]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <Link
                              href={`/p/${portfolio.slug}`}
                              target="_blank"
                              className="p-1 text-[#2D5D60] hover:text-[#1E3F41] rounded transition-colors"
                              title="Open Live Public Site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-[#E8DFD3] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/portfolio/${portfolio._id}/edit`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2B1D1C] text-xs font-semibold border border-[#E8DFD3] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#2D5D60]" />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href={`/portfolio/${portfolio._id}/preview`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2B1D1C] text-xs font-semibold border border-[#E8DFD3] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#9B4D60]" />
                        <span>Preview</span>
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Publish/Unpublish toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(portfolio)}
                        disabled={publishingId === portfolio._id}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          portfolio.status === "published"
                            ? "bg-[#FAF0F2] text-[#9B4D60] hover:bg-[#F5CCD4] border border-[#EAD2D8]"
                            : "bg-[#2D5D60] text-white hover:bg-[#22484A]"
                        }`}
                      >
                        {publishingId === portfolio._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : portfolio.status === "published" ? (
                          "Unpublish"
                        ) : (
                          "Publish"
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(portfolio._id)}
                        className="p-1.5 rounded-lg text-[#6B5755] hover:text-[#9B4D60] hover:bg-[#FAF0F2] transition-colors"
                        title="Delete portfolio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B1D1C]/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] border border-[#E8DFD3] p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF0F2] text-[#9B4D60] flex items-center justify-center mx-auto border border-[#EAD2D8]">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#2B1D1C]">Delete Portfolio?</h3>
              <p className="text-xs text-[#6B5755]">
                Are you sure you want to delete this portfolio? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B5755] hover:text-[#2B1D1C] bg-[#FFFFFF] border border-[#E8DFD3]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B4D60] hover:bg-[#853D4E] text-white text-xs font-semibold shadow-md disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Portfolio Modal */}
      <CreatePortfolioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={loadPortfolios}
      />
    </div>
  );
}
