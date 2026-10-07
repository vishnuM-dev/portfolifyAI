import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./mongodb";
import User from "@/models/User";

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hashes a plaintext password securely using bcryptjs.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a bcrypt hashed password.
 */
export async function verifyPassword(
  password: string,
  hashedPassword?: string | null
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(password, hashedPassword);
}

/**
 * NextAuth configuration options using Credentials Provider with MongoDB Atlas
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();

        // Connect to MongoDB
        await connectToDatabase();

        // Find user by email, explicitly including the password hash for verification
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return safe user object (password is never included)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar || "",
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};
