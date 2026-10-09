import { IPortfolio, StructuredResumeData, IResumeMeta } from "@/types/portfolio";
import { apiRequest, getApiBaseUrl, getStoredToken } from "./api";

export const portfolioApi = {
  /**
   * Create a new portfolio (optionally with parsed resume data)
   */
  async createPortfolio(data?: Partial<IPortfolio> & { structuredResume?: StructuredResumeData }) {
    return apiRequest<{ portfolio: IPortfolio }>("/portfolios", {
      method: "POST",
      body: JSON.stringify(data || {}),
    });
  },

  /**
   * Get all portfolios for authenticated user
   */
  async getPortfolios() {
    return apiRequest<{ portfolios: IPortfolio[] }>("/portfolios");
  },

  /**
   * Get single portfolio by ID
   */
  async getPortfolio(id: string) {
    return apiRequest<{ portfolio: IPortfolio }>(`/portfolios/${id}`);
  },

  /**
   * Update portfolio
   */
  async updatePortfolio(id: string, updates: Partial<IPortfolio>) {
    return apiRequest<{ portfolio: IPortfolio }>(`/portfolios/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete portfolio
   */
  async deletePortfolio(id: string) {
    return apiRequest(`/portfolios/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Publish portfolio
   */
  async publishPortfolio(id: string) {
    return apiRequest<{ portfolio: IPortfolio; publicUrl: string }>(`/portfolios/${id}/publish`, {
      method: "POST",
    });
  },

  /**
   * Unpublish portfolio
   */
  async unpublishPortfolio(id: string) {
    return apiRequest<{ portfolio: IPortfolio }>(`/portfolios/${id}/unpublish`, {
      method: "POST",
    });
  },

  /**
   * Upload and parse resume file directly (multipart/form-data)
   */
  async parseResumeFile(file: File) {
    const formData = new FormData();
    formData.append("resume", file);

    const headers: Record<string, string> = {};
    const token = getStoredToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await fetch(`${getApiBaseUrl()}/portfolios/parse-resume`, {
        method: "POST",
        body: formData,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data?.message || "Failed to parse resume",
        };
      }

      return {
        success: true,
        structuredData: data.structuredData as StructuredResumeData,
        resumeMeta: data.resumeMeta as IResumeMeta,
      };
    } catch {
      return {
        success: false,
        message: "Failed to upload and parse resume. Please verify backend connection.",
      };
    }
  },

  /**
   * Upload resume to existing portfolio
   */
  async uploadResumeToPortfolio(portfolioId: string, file: File) {
    const formData = new FormData();
    formData.append("resume", file);

    const headers: Record<string, string> = {};
    const token = getStoredToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await fetch(`${getApiBaseUrl()}/portfolios/${portfolioId}/resume`, {
        method: "POST",
        body: formData,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data?.message || "Failed to upload resume",
        };
      }

      return {
        success: true,
        portfolio: data.portfolio as IPortfolio,
        structuredData: data.structuredData as StructuredResumeData,
      };
    } catch {
      return {
        success: false,
        message: "Network error while uploading resume.",
      };
    }
  },

  /**
   * STEP 9: Analyze resume quality
   */
  async analyzeResumeQuality(file?: File, rawText?: string, portfolioId?: string) {
    const formData = new FormData();
    if (file) formData.append("resume", file);
    if (rawText) formData.append("rawText", rawText);

    try {
      const endpoint = portfolioId
        ? `${getApiBaseUrl()}/portfolios/${portfolioId}/resume/quality`
        : `${getApiBaseUrl()}/portfolios/resume/quality`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: file ? formData : JSON.stringify({ rawText }),
        headers: file ? undefined : { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: "Failed to analyze resume quality." };
    }
  },

  /**
   * STEP 9: Compare resume with existing portfolio
   */
  async compareResume(portfolioId: string, file?: File, rawText?: string) {
    const formData = new FormData();
    if (file) formData.append("resume", file);
    if (rawText) formData.append("rawText", rawText);

    try {
      const response = await fetch(`${getApiBaseUrl()}/portfolios/${portfolioId}/resume/compare`, {
        method: "POST",
        body: file ? formData : JSON.stringify({ rawText }),
        headers: file ? undefined : { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: "Failed to compare resume with portfolio." };
    }
  },

  /**
   * STEP 9: Selectively merge approved resume data into portfolio
   */
  async mergeResumeData(portfolioId: string, selections: any) {
    return apiRequest<{ portfolio: IPortfolio }>(`/portfolios/${portfolioId}/resume/merge`, {
      method: "POST",
      body: JSON.stringify(selections),
    });
  },

  /**
   * Get public portfolio by slug (no auth needed)
   */
  async getPublicPortfolio(slug: string) {
    try {
      const response = await fetch(`${getApiBaseUrl()}/portfolios/public/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: data?.message || "Portfolio not found",
        };
      }

      return {
        success: true,
        portfolio: (data.portfolio || data.data?.portfolio) as IPortfolio,
      };
    } catch {
      return {
        success: false,
        message: "Unable to load public portfolio.",
      };
    }
  },

  /**
   * Get all active templates catalog from backend
   */
  async getTemplates() {
    try {
      const response = await fetch(`${getApiBaseUrl()}/templates`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: "Failed to load templates list from server." };
    }
  },

  /**
   * Get a single template details by ID
   */
  async getTemplate(id: string) {
    try {
      const response = await fetch(`${getApiBaseUrl()}/templates/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: `Failed to load template '${id}'.` };
    }
  },
};

export default portfolioApi;
