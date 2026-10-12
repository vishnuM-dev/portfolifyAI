import { GoogleGenAI } from "@google/genai";
import { IAIProvider, AICompletionResult } from "../aiProvider";

export class GeminiProvider implements IAIProvider {
  readonly name = "gemini";
  readonly modelName: string;
  private readonly apiKey: string;
  private client: GoogleGenAI | null = null;

  constructor() {
    // Read API key exclusively from backend environment variables
    const rawKey =
      process.env.GEMINI_API_KEY?.trim() ||
      (process.env.OPENAI_API_KEY?.trim().startsWith("AIza") ? process.env.OPENAI_API_KEY.trim() : "");
    this.apiKey = rawKey || "";
    this.modelName = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash";
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 10);
  }

  private getClient(): GoogleGenAI {
    if (!this.client) {
      if (!this.isAvailable()) {
        const error: any = new Error("AI intelligence is not currently configured. Missing GEMINI_API_KEY.");
        error.status = 503;
        error.code = "AI_NOT_CONFIGURED";
        throw error;
      }
      this.client = new GoogleGenAI({ apiKey: this.apiKey });
    }
    return this.client;
  }

  /**
   * Safely sanitize error messages to ensure API keys are never leaked in logs or error messages
   */
  private sanitizeErrorMessage(msg: string): string {
    return msg
      .replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED_API_KEY]")
      .replace(/key=[^&\s]+/gi, "key=[REDACTED]")
      .replace(/apiKey=[^&\s]+/gi, "apiKey=[REDACTED]");
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generateJSON<T = unknown>(systemPrompt: string, userPrompt: string): Promise<AICompletionResult<T>> {
    if (!this.isAvailable()) {
      const error: any = new Error("AI intelligence is not currently configured. Missing GEMINI_API_KEY.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const ai = this.getClient();

    // Primary model is the configured model.
    // Fallback models are used ONLY for transient server demand spikes (503 UNAVAILABLE / 429).
    const candidateModels = [
      this.modelName,
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-flash-latest",
    ];
    const modelsToTry = Array.from(new Set(candidateModels.filter(Boolean)));

    let lastError: any = null;
    let successfulModel = this.modelName;
    let response: any = null;

    for (let modelIdx = 0; modelIdx < modelsToTry.length; modelIdx++) {
      const currentModel = modelsToTry[modelIdx];

      // Retry up to 3 attempts with bounded exponential backoff for transient 503 / 429
      const maxAttempts = 3;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          response = await ai.models.generateContent({
            model: currentModel,
            contents: userPrompt,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
              temperature: 0.2, // Low temperature for deterministic, factual output
            },
          });
          successfulModel = currentModel;
          lastError = null;
          break; // Success on this attempt
        } catch (apiErr: any) {
          lastError = apiErr;
          const msg = apiErr?.message || "";

          const isAuthError =
            msg.includes("401") ||
            msg.includes("403") ||
            msg.toLowerCase().includes("api key") ||
            msg.toLowerCase().includes("api_key_invalid") ||
            msg.toLowerCase().includes("unauthorized") ||
            msg.toLowerCase().includes("permission denied");

          const isModelNotFound =
            msg.includes("404") ||
            msg.toLowerCase().includes("not found") ||
            msg.toLowerCase().includes("no longer available") ||
            msg.toLowerCase().includes("is not supported");

          // Fail-fast rule: Authentication errors must NOT be repeatedly retried
          if (isAuthError) {
            const error: any = new Error("Google Gemini authentication failed. Please verify the configured API key.");
            error.status = 500;
            error.code = "AI_AUTH_ERROR";
            throw error;
          }

          // Fail-fast rule: Invalid model errors on configured model must NOT be retried on the same model
          if (isModelNotFound) {
            // Do not retry this model
            break;
          }

          const isTransient =
            msg.includes("503") ||
            msg.includes("UNAVAILABLE") ||
            msg.toLowerCase().includes("high demand") ||
            msg.toLowerCase().includes("temporarily unavailable") ||
            msg.includes("429") ||
            msg.includes("RESOURCE_EXHAUSTED");

          // Bounded exponential backoff for transient errors: 1s, 2s, capped at 4s
          if (isTransient && attempt < maxAttempts - 1) {
            const backoffMs = Math.min(1000 * Math.pow(2, attempt), 4000);
            await this.delay(backoffMs);
            continue;
          }

          // If not transient or exhausted retries for this model, break to fallback model
          break;
        }
      }

      if (response) {
        break;
      }
    }

    if (!response) {
      const rawMsg = lastError?.message || "Unknown error occurred";
      const sanitizedMsg = this.sanitizeErrorMessage(rawMsg);
      const isRateLimit =
        rawMsg.includes("429") ||
        rawMsg.includes("RESOURCE_EXHAUSTED") ||
        rawMsg.toLowerCase().includes("quota") ||
        rawMsg.toLowerCase().includes("rate limit");
      const isNotFound =
        rawMsg.includes("404") ||
        rawMsg.toLowerCase().includes("not found") ||
        rawMsg.toLowerCase().includes("no longer available");
      const isNetwork =
        rawMsg.toLowerCase().includes("fetch failed") ||
        rawMsg.toLowerCase().includes("enotfound") ||
        rawMsg.toLowerCase().includes("timeout") ||
        rawMsg.toLowerCase().includes("network");

      let status = 502;
      let code = "AI_PROVIDER_ERROR";
      let userFriendlyMessage = `Gemini AI Provider Error: ${sanitizedMsg}`;

      if (isRateLimit) {
        status = 429;
        code = "AI_RATE_LIMIT";
        userFriendlyMessage = "AI service rate limit or quota exceeded. Please try again shortly.";
      } else if (isNotFound) {
        status = 502;
        code = "AI_MODEL_UNSUPPORTED";
        userFriendlyMessage = `Configured Gemini model '${this.modelName}' is unavailable or unsupported. Please check GEMINI_MODEL.`;
      } else if (isNetwork) {
        status = 503;
        code = "AI_NETWORK_ERROR";
        userFriendlyMessage = "Failed to reach Google Gemini service. Network connection issue.";
      } else if (rawMsg.includes("503") || rawMsg.includes("high demand")) {
        status = 503;
        code = "AI_SERVICE_UNAVAILABLE";
        userFriendlyMessage = "Gemini service is temporarily experiencing high demand. Please try again in a few moments.";
      }

      const error: any = new Error(userFriendlyMessage);
      error.status = status;
      error.code = code;
      throw error;
    }

    const rawText = response?.text;
    if (!rawText || typeof rawText !== "string" || !rawText.trim()) {
      const error: any = new Error("AI returned an empty response.");
      error.status = 502;
      error.code = "AI_EMPTY_RESPONSE";
      throw error;
    }

    // Strip markdown code fences if present
    const cleanedJson = rawText
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let parsedData: T;
    try {
      parsedData = JSON.parse(cleanedJson);
    } catch {
      const error: any = new Error("AI returned malformed JSON response.");
      error.status = 502;
      error.code = "AI_MALFORMED_JSON";
      throw error;
    }

    const usage = response?.usageMetadata || {};
    const promptTokens = usage.promptTokenCount || 0;
    const completionTokens = usage.candidatesTokenCount || 0;
    const totalTokens = usage.totalTokenCount || promptTokens + completionTokens;

    return {
      data: parsedData,
      rawJson: cleanedJson,
      provider: this.name,
      model: successfulModel,
      promptTokens,
      completionTokens,
      totalTokens,
    };
  }
}

export default GeminiProvider;
