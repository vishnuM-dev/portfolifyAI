import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth";
import User from "../models/User";
import AuthService from "../services/authService";

export class UserController {
  /**
   * Get user profile by ID or current user
   * GET /api/users/profile
   */
  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: AuthService.toDTO(user),
      });
    } catch (error) {
      console.error("[UserController.getProfile] Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve user profile.",
      });
    }
  }
}

export default UserController;
