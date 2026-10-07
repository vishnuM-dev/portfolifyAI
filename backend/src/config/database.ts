import mongoose from "mongoose";

/**
 * Establishes and manages connection to MongoDB Atlas database 'portfolify_ai'
 */
export async function connectDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing in backend/.env");
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });

    console.log(`[Database] MongoDB Atlas connected to '${conn.connection.name || "portfolify_ai"}' successfully.`);
    return conn;
  } catch (error) {
    console.error("[Database] MongoDB connection error:", error);
    throw error;
  }
}

export default connectDatabase;
