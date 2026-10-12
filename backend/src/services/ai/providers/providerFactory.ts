import { IAIProvider } from "../aiProvider";
import { OpenAIProvider } from "./openaiProvider";
import { GeminiProvider } from "./geminiProvider";

export class AIProviderFactory {
  private static cachedProvider: IAIProvider | null = null;

  static getProvider(): IAIProvider {
    if (this.cachedProvider) {
      return this.cachedProvider;
    }

    const rawProviderType = (process.env.AI_PROVIDER || "").toLowerCase().trim();

    // Determine default provider if not explicitly configured
    let providerType = rawProviderType;
    if (!providerType) {
      if (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY?.startsWith("AIza")) {
        providerType = "gemini";
      } else {
        providerType = "gemini"; // default to gemini
      }
    }

    switch (providerType) {
      case "gemini":
      case "google":
        this.cachedProvider = new GeminiProvider();
        return this.cachedProvider;

      case "openai":
        this.cachedProvider = new OpenAIProvider();
        return this.cachedProvider;

      default:
        // Fallback to Gemini if configured, otherwise OpenAI
        const gemini = new GeminiProvider();
        if (gemini.isAvailable()) {
          this.cachedProvider = gemini;
          return this.cachedProvider;
        }
        this.cachedProvider = new OpenAIProvider();
        return this.cachedProvider;
    }
  }

  static isConfigured(): boolean {
    const provider = this.getProvider();
    return provider.isAvailable();
  }

  /**
   * Reset provider instance cache (useful for testing or dynamic config reloads)
   */
  static resetProvider(): void {
    this.cachedProvider = null;
  }
}

export default AIProviderFactory;
