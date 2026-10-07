import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/auth";
import AuthService from "../services/authService";
import User from "../models/User";

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Fallback to HTTP-only cookie if header is not present
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to access this resource.",
      });
      return;
    }

    const payload = AuthService.verifyToken(token);
    const user = await User.findById(payload.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User session is invalid or user no longer exists.",
      });
      return;
    }

    req.user = AuthService.toDTO(user);
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token. Please log in again.",
    });
  }
}

export default authenticate;
