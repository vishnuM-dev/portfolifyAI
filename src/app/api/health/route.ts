import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { HealthCheckResponse } from "@/types/api";

export async function GET() {
  try {
    // Attempt database connection with cached Mongoose instance
    await connectToDatabase();

    const readyState = mongoose.connection.readyState;
    const isConnected = readyState === 1;

    const responseData: HealthCheckResponse = {
      success: isConnected,
      message: isConnected
        ? "Portfolify AI API is healthy"
        : "Portfolify AI API is running with degraded database connection",
      database: isConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responseData, {
      status: isConnected ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    // Safe error response without exposing credentials, connection strings, or internal stack traces
    const errorResponse: HealthCheckResponse = {
      success: false,
      message: "Database connection failed",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(errorResponse, {
      status: 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
