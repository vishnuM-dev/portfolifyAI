import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 }
      );
    }

    // Hash password securely with bcrypt
    const hashedPassword = await hashPassword(password);

    // Create user in MongoDB
    await User.create({
      name: cleanName,
      email: normalizedEmail,
      password: hashedPassword,
      avatar: "",
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch {
    // Return sanitized error response - no technical internals or stack traces
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while creating your account. Please try again.",
      },
      { status: 500 }
    );
  }
}
