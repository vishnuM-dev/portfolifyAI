export interface AICompletionResult<T> {
  data: T;
  rawJson: string;
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface IAIProvider {
  readonly name: string;
  readonly modelName: string;
  isAvailable(): boolean;
  generateJSON<T = unknown>(systemPrompt: string, userPrompt: string): Promise<AICompletionResult<T>>;
}
