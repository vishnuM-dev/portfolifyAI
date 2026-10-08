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
      const list = res.data?.portfolios || (res as any).portfolios;
      if (res.success && Array.isArray(list)) {
        setPortfolios(list);
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
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
          <p className="text-xs text-[#6D594D] font-medium">Verifying authentication...</p>
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
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#F8F3EC]/90 backdrop-blur-md border-b border-[#E6DACB] shadow-sm shadow-[#2B1D15]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" id="dashboard-home-link">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D47A41] to-[#E8955F] flex items-center justify-center shadow-md shadow-[#D47A41]/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight text-[#2B1D15]">
                Portfolify
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
                AI
              </span>
            </div>
          </Link>

          {/* User profile badge & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#E6DACB] shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#D47A41] text-white text-xs font-bold flex items-center justify-center">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#2B1D15] leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-[#6D594D] leading-none mt-1">
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
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6DACB]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2B1D15] tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#6D594D] mt-1">
              Create, edit, and publish high-impact personal portfolio websites.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#D47A41]/20 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] shrink-0"
            id="create-portfolio-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Create Portfolio</span>
          </button>
        </section>

        {/* Global Action Error Alert */}
        {actionError && (
          <div className="p-4 rounded-2xl bg-[#FDF0EE] border border-[#F9CBC6] text-[#C03E31] text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{actionError}</span>
          </div>
        )}

        {/* Portfolios Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-[#D47A41]" />
              <h2 className="text-base sm:text-lg font-bold text-[#2B1D15]">My Portfolios</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] font-semibold border border-[#F6D5C2]">
                {portfolios.length}
              </span>
            </div>
          </div>

          {loadingPortfolios ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#D47A41] mx-auto" />
              <p className="text-xs text-[#6D594D]">Loading your portfolios from database...</p>
            </div>
          ) : portfolios.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl bg-[#FFFDF9] border-2 border-dashed border-[#E6DACB] p-8 sm:p-14 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF1E8] text-[#D47A41] flex items-center justify-center mx-auto border border-[#F6D5C2]">
                <Layout className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#2B1D15]">
                  You haven&apos;t created a portfolio yet
                </h3>
                <p className="text-xs text-[#6D594D] max-w-sm mx-auto leading-relaxed">
                  Start from scratch or upload your resume (PDF/DOCX) to automatically generate structured experience and projects.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-[0.98]"
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
                  className="rounded-3xl bg-[#FFFDF9] border border-[#E6DACB] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md hover:border-[#D47A41]/40 transition-all"
                >
                  <div className="space-y-3">
                    {/* Status & Template Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                          portfolio.status === "published"
                            ? "bg-[#ECF5EF] text-[#345D40] border border-[#BDE0CB]"
                            : "bg-[#F8F3EC] text-[#9E8C7E] border border-[#E6DACB]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            portfolio.status === "published" ? "bg-[#447250]" : "bg-[#9E8C7E]"
                          }`}
                        />
                        <span>{portfolio.status}</span>
                      </span>

                      <span className="text-[11px] font-mono text-[#6D594D] bg-[#F8F3EC] px-2 py-0.5 rounded-md border border-[#E6DACB] capitalize">
                        {portfolio.template} Template
                      </span>
                    </div>

                    {/* Title & Headline */}
                    <div>
                      <h3 className="text-base font-bold text-[#2B1D15] truncate">
                        {portfolio.profile?.name || "Untitled Portfolio"}
                      </h3>
                      <p className="text-xs text-[#D47A41] font-medium truncate mt-0.5">
                        {portfolio.profile?.headline || "Professional Portfolio"}
                      </p>
                    </div>

                    {/* Stats & Meta summary */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#6D594D] pt-1">
                      <span>{portfolio.skills?.length || 0} Skills</span>
                      <span>•</span>
                      <span>{portfolio.experience?.length || 0} Exp</span>
                      <span>•</span>
                      <span>{portfolio.projects?.length || 0} Projects</span>
                    </div>

                    {/* Public URL row (if published) */}
                    {portfolio.status === "published" && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] text-xs gap-2">
                          <span className="font-mono text-[11px] text-[#D47A41] truncate max-w-[150px] sm:max-w-[170px]">
                            /p/{portfolio.slug}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyLink(portfolio.slug)}
                              className="p-1 text-[#6D594D] hover:text-[#2B1D15] rounded transition-colors cursor-pointer"
                              title="Copy Public Link"
                            >
                              {copiedSlug === portfolio.slug ? (
                                <Check className="w-3.5 h-3.5 text-[#447250]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <Link
                              href={`/p/${portfolio.slug}`}
                              target="_blank"
                              className="p-1 text-[#D47A41] hover:text-[#BF6A34] rounded transition-colors"
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
                  <div className="pt-4 border-t border-[#E6DACB] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/portfolio/${portfolio._id}/edit`}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#D47A41]" />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href={`/portfolio/${portfolio._id}/preview`}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#DE8638]" />
                        <span>Preview</span>
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Publish/Unpublish toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(portfolio)}
                        disabled={publishingId === portfolio._id}
                        className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          portfolio.status === "published"
                            ? "bg-[#FDF1E8] text-[#D47A41] hover:bg-[#FBE4D5] border border-[#F6D5C2]"
                            : "bg-[#D47A41] text-white hover:bg-[#BF6A34]"
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
                        className="p-1.5 rounded-lg text-[#6D594D] hover:text-[#C03E31] hover:bg-[#FDF0EE] transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B1D15]/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#F8F3EC] border border-[#E6DACB] p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0EE] text-[#C03E31] flex items-center justify-center mx-auto border border-[#F9CBC6]">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#2B1D15]">Delete Portfolio?</h3>
              <p className="text-xs text-[#6D594D]">
                Are you sure you want to delete this portfolio? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6D594D] hover:text-[#2B1D15] bg-[#FFFDF9] border border-[#E6DACB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C03E31] hover:bg-[#A83226] text-white text-xs font-semibold shadow-md disabled:opacity-50"
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
