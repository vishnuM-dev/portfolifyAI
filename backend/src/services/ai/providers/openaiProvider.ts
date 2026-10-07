import { IAIProvider, AICompletionResult } from "../aiProvider";

export class OpenAIProvider implements IAIProvider {
  readonly name = "openai";
  readonly modelName: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY?.trim() || "";
    this.modelName = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
    this.baseUrl = (process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/+$/, "");
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  async generateJSON<T = unknown>(systemPrompt: string, userPrompt: string): Promise<AICompletionResult<T>> {
    if (!this.isAvailable()) {
      const error: any = new Error("AI provider is not configured. Missing OPENAI_API_KEY.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const endpoint = `${this.baseUrl}/chat/completions`;

    const requestBody = {
      model: this.modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // low temperature for maximum factual fidelity and deterministic output
    };

    let response: globalThis.Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });
    } catch (networkErr: any) {
      const error: any = new Error(`Failed to reach AI service: ${networkErr.message || "Network error"}`);
      error.status = 503;
      error.code = "AI_NETWORK_ERROR";
      throw error;
    }

    const resJson = (await response.json().catch(() => null)) as any;

    if (!response.ok) {
      const errorMsg = resJson?.error?.message || `AI API returned status ${response.status}`;
      const error: any = new Error(`AI Provider Error: ${errorMsg}`);
      error.status = response.status === 401 ? 500 : response.status === 429 ? 429 : 502;
      error.code = "AI_PROVIDER_ERROR";
      throw error;
    }

    const content = resJson?.choices?.[0]?.message?.content;
    if (!content) {
      const error: any = new Error("AI returned an empty response.");
      error.status = 502;
      error.code = "AI_EMPTY_RESPONSE";
      throw error;
    }

    let parsedData: T;
    try {
      parsedData = JSON.parse(content);
    } catch {
      const error: any = new Error("AI returned malformed JSON.");
      error.status = 502;
      error.code = "AI_MALFORMED_JSON";
      throw error;
    }

    const usage = resJson?.usage || {};

    return {
      data: parsedData,
      rawJson: content,
      provider: this.name,
      model: this.modelName,
      promptTokens: usage.prompt_tokens || 0,
      completionTokens: usage.completion_tokens || 0,
      totalTokens: usage.total_tokens || 0,
    };
  }
}

export default OpenAIProvider;
