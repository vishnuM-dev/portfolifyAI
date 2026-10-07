import { IAIProvider } from "../aiProvider";
import { OpenAIProvider } from "./openaiProvider";

export class AIProviderFactory {
  private static cachedProvider: IAIProvider | null = null;

  static getProvider(): IAIProvider {
    if (this.cachedProvider) {
      return this.cachedProvider;
    }

    const providerType = (process.env.AI_PROVIDER || "openai").toLowerCase();

    switch (providerType) {
      case "openai":
      default:
        this.cachedProvider = new OpenAIProvider();
        return this.cachedProvider;
    }
  }

  static isConfigured(): boolean {
    const provider = this.getProvider();
    return provider.isAvailable();
  }
}

export default AIProviderFactory;
