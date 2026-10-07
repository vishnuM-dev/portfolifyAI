import mongoose, { Schema } from "mongoose";

export interface IAIUsage {
  userId: mongoose.Types.ObjectId;
  portfolioId?: mongoose.Types.ObjectId;
  operation: string;
  provider: string;
  aiModel: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  status: "success" | "error" | "rate_limited" | "not_configured";
  errorMessage?: string;
  createdAt?: Date;
}

const AIUsageSchema = new Schema<IAIUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      index: true,
    },
    operation: {
      type: String,
      required: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
      default: "openai",
    },
    aiModel: {
      type: String,
      required: true,
    },
    promptTokens: {
      type: Number,
      default: 0,
    },
    completionTokens: {
      type: Number,
      default: 0,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["success", "error", "rate_limited", "not_configured"],
      required: true,
      default: "success",
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AIUsageSchema.index({ userId: 1, createdAt: -1 });

export const AIUsage = mongoose.models.AIUsage || mongoose.model<IAIUsage>("AIUsage", AIUsageSchema);
export default AIUsage;
