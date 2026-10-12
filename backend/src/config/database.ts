import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

// Ensure environment variables are loaded if database.ts is imported independently
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
  dotenv.config();
}

/**
 * Strips sensitive username and password credentials from a MongoDB connection string
 * for safe, compliant diagnostic logging.
 */
export function sanitizeMongoUri(uri?: string): string {
  if (!uri) return "[EMPTY_URI]";
  try {
    // Regex matches mongodb:// or mongodb+srv:// credentials
    return uri.replace(
      /(mongodb(?:\+srv)?:\/\/)([^:@]+):([^@]+)@/i,
      "$1***:***@"
    );
  } catch {
    return "[MALFORMED_URI]";
  }
}

/**
 * Configure DNS fallback for environments (such as Windows) where local loopback
 * DNS servers (127.0.0.1) fail to resolve MongoDB SRV records.
 */
function configureDnsFallbackIfNeeded(uri: string): void {
  try {
    if (uri.startsWith("mongodb+srv://")) {
      const currentServers = dns.getServers();
      const hasOnlyLoopback =
        currentServers.length === 1 &&
        (currentServers[0] === "127.0.0.1" || currentServers[0] === "::1");

      if (hasOnlyLoopback) {
        console.log(
          "[Database] Detected loopback DNS. Adding Google & Cloudflare DNS (8.8.8.8, 1.1.1.1) for reliable MongoDB SRV resolution."
        );
        dns.setServers([...currentServers, "8.8.8.8", "1.1.1.1"]);
      }
    }
  } catch (dnsErr) {
    console.warn("[Database] Warning: Could not configure DNS fallback:", dnsErr);
  }
}

/**
 * Analyzes and logs a detailed, sanitized explanation of the connection error
 * to distinguish DNS, IP whitelist/firewall, authentication, or timeout issues.
 */
function logDetailedConnectionDiagnostics(error: any, sanitizedUri: string): void {
  const errMsg = error?.message || String(error);
  const errName = error?.name || "DatabaseError";
  const errCode = error?.code;

  console.error("\n=======================================================");
  console.error("❌ MongoDB Atlas Connection Failure Diagnostics");
  console.error("=======================================================");
  console.error(`Target URI:       ${sanitizedUri}`);
  console.error(`Error Type:       ${errName}`);
  console.error(`Error Code:       ${errCode || "N/A"}`);
  console.error(`Error Message:    ${errMsg}`);

  // 1. Authentication Failure (Code 18 or 'Authentication failed')
  if (
    errCode === 18 ||
    /auth(entication)? failed/i.test(errMsg) ||
    /bad auth/i.test(errMsg)
  ) {
    console.error("\n[Diagnosis] 🔑 Authentication Failed:");
    console.error("  - The database username or password in MONGODB_URI is incorrect.");
    console.error("  - Or the authSource (usually 'admin') is missing or incorrect.");
    console.error("  - Action: Check credentials in backend/.env under MONGODB_URI.");
  }
  // 2. DNS Resolution Failure
  else if (
    /querySrv/i.test(errMsg) ||
    /ENOTFOUND/i.test(errMsg) ||
    /EAI_AGAIN/i.test(errMsg)
  ) {
    console.error("\n[Diagnosis] 🌐 DNS Resolution Failure:");
    console.error("  - Could not resolve the Atlas cluster hostname or SRV record.");
    console.error("  - Action: Verify internet access, DNS servers, or switch to the direct shard replica set URI.");
  }
  // 3. Network / IP Whitelist / Replica Set Primary Timeout
  else if (
    /ReplicaSetNoPrimary/i.test(errMsg) ||
    /MongooseServerSelectionError/i.test(errName) ||
    /ETIMEDOUT/i.test(errMsg) ||
    /ECONNREFUSED/i.test(errMsg)
  ) {
    console.error("\n[Diagnosis] 🛡️ Network Timeout or IP Whitelist Restriction:");
    console.error("  - Mongoose could not connect to or select a primary node in the replica set within the timeout.");
    console.error("  - Probable Root Causes:");
    console.error("    1. IP Whitelist: Your current public IP is not in MongoDB Atlas Network Access.");
    console.error("       -> Fix: Open MongoDB Atlas (https://cloud.mongodb.com) -> Network Access -> Add IP Address.");
    console.error("    2. Network Firewall / VPN: Outbound TCP connections to port 27017 are blocked.");
    console.error("    3. Cluster State: The Atlas cluster is paused, restarting, or undergoing replica set election.");
    console.error("    4. Server Selection Timeout: High latency caused the handshake to exceed the timeout window.");
  } else {
    console.error("\n[Diagnosis] ⚠️ General Connection Issue:");
    console.error(`  - Review Mongoose logs: ${errMsg}`);
  }
  console.error("=======================================================\n");
}

let isEventListenersRegistered = false;

function registerConnectionEventListeners(): void {
  if (isEventListenersRegistered) return;
  isEventListenersRegistered = true;

  mongoose.connection.on("connected", () => {
    console.log("[Database] Mongoose connected to MongoDB Atlas.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[Database] Runtime MongoDB connection error:", err?.message || err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[Database] MongoDB connection lost / disconnected.");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("[Database] MongoDB connection re-established.");
  });
}

/**
 * Establishes and manages connection to MongoDB Atlas database
 * with retry logic, resilient timeouts, and production diagnostics.
 */
export async function connectDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const errorMsg = "MONGODB_URI environment variable is missing in backend/.env";
    console.error(`[Database] ❌ Configuration Error: ${errorMsg}`);
    throw new Error(errorMsg);
  }

  const sanitized = sanitizeMongoUri(uri);
  configureDnsFallbackIfNeeded(uri);
  registerConnectionEventListeners();

  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    console.log("[Database] Already connected to MongoDB Atlas.");
    return mongoose;
  }

  // Resilient connection options supported in Mongoose 8.x
  const serverSelectionTimeoutMS = parseInt(
    process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || "30000",
    10
  );
  const connectTimeoutMS = parseInt(
    process.env.MONGODB_CONNECT_TIMEOUT_MS || "20000",
    10
  );
  const socketTimeoutMS = parseInt(
    process.env.MONGODB_SOCKET_TIMEOUT_MS || "45000",
    10
  );
  const maxPoolSize = parseInt(process.env.MONGODB_MAX_POOL_SIZE || "10", 10);
  const minPoolSize = parseInt(process.env.MONGODB_MIN_POOL_SIZE || "2", 10);

  const mongooseOptions: mongoose.ConnectOptions = {
    serverSelectionTimeoutMS,
    connectTimeoutMS,
    socketTimeoutMS,
    maxPoolSize,
    minPoolSize,
    retryWrites: true,
    retryReads: true,
    autoIndex: process.env.NODE_ENV !== "production",
  };

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      if (attempt > 1) {
        console.log(
          `[Database] Retrying MongoDB Atlas connection (attempt ${attempt}/${MAX_RETRIES})...`
        );
      } else {
        console.log(
          `[Database] Connecting to MongoDB Atlas (${sanitized}) with ${serverSelectionTimeoutMS}ms timeout...`
        );
      }

      const conn = await mongoose.connect(uri, mongooseOptions);

      const dbName = conn.connection.name || "portfolify_ai";
      console.log(
        `[Database] ✅ MongoDB Atlas connected successfully to database '${dbName}'.`
      );
      return conn;
    } catch (error: any) {
      if (attempt < MAX_RETRIES) {
        const backoffMs = attempt * 2000;
        console.warn(
          `[Database] Connection attempt ${attempt} failed: ${error.message || error}. Retrying in ${backoffMs}ms...`
        );
        await new Promise((res) => setTimeout(res, backoffMs));
      } else {
        logDetailedConnectionDiagnostics(error, sanitized);
        throw error;
      }
    }
  }

  throw new Error("Failed to connect to MongoDB Atlas after all retry attempts.");
}

/**
 * Returns the current database connection health status
 */
export function getDatabaseStatus(): {
  readyState: number;
  status: "connected" | "connecting" | "disconnecting" | "disconnected";
  databaseName?: string;
} {
  const state = mongoose.connection.readyState;
  const statusMap: Record<number, "disconnected" | "connected" | "connecting" | "disconnecting"> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    readyState: state,
    status: statusMap[state] || "disconnected",
    databaseName: mongoose.connection.name,
  };
}

export default connectDatabase;
