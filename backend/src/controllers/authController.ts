import { Request, Response } from "express";
import User from "../models/User";
import AuthService from "../services/authService";
import { AuthenticatedRequest } from "../types/auth";

export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body || {};

      // Server-side validation
      if (!name || typeof name !== "string" || !name.trim()) {
        res.status(400).json({
          success: false,
          message: "Full name is required.",
        });
        return;
      }

      if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        res.status(400).json({
          success: false,
          message: "A valid email address is required.",
        });
        return;
      }

      if (!password || typeof password !== "string" || password.length < 8) {
        res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long.",
        });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();
      const cleanName = name.trim();

      // Check if user already exists
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "An account with this email already exists",
        });
        return;
      }

      // Hash password with bcryptjs (12 salt rounds)
      const hashedPassword = await AuthService.hashPassword(password);

      // Create new user in MongoDB Atlas
      const newUser = await User.create({
        name: cleanName,
        email: normalizedEmail,
        password: hashedPassword,
        avatar: "",
        role: "user",
      });

      const userDTO = AuthService.toDTO(newUser);
      const token = AuthService.generateToken(userDTO);

      // Set secure HTTP-only cookie
      const cookieDays = parseInt(process.env.COOKIE_EXPIRES_IN || "7", 10);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: cookieDays * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: userDTO,
        token,
      });
    } catch (error) {
      console.error("[AuthController.register] Error:", error);
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred while creating your account. Please try again.",
      });
    }
  }

  /**
   * Log in an existing user
   * POST /api/auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body || {};

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Please provide both email and password.",
        });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Find user and explicitly select password for verification
      const user = await User.findOne({ email: normalizedEmail }).select("+password");

      if (!user || !user.password) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      const isPasswordValid = await AuthService.verifyPassword(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      const userDTO = AuthService.toDTO(user);
      const token = AuthService.generateToken(userDTO);

      // Set secure HTTP-only cookie
      const cookieDays = parseInt(process.env.COOKIE_EXPIRES_IN || "7", 10);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: cookieDays * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userDTO,
        token,
      });
    } catch (error) {
      console.error("[AuthController.login] Error:", error);
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred during login. Please try again.",
      });
    }
  }

  /**
   * Get currently authenticated user
   * GET /api/auth/me
   */
  static async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Not authenticated.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      console.error("[AuthController.getMe] Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch user session.",
      });
    }
  }

  /**
   * Logout user and clear session cookie
   * POST /api/auth/logout
   */
  static async logout(_req: Request, res: Response): Promise<void> {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("[AuthController.logout] Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to logout.",
      });
    }
  }
}

export default AuthController;
