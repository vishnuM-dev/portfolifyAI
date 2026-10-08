import { Router } from "express";
import AuthController from "../controllers/authController";
import authenticate from "../middleware/authMiddleware";

const router = Router();

// Public auth endpoints
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

// Protected session endpoint
router.get("/me", authenticate, AuthController.getMe);

// Logout endpoint
router.post("/logout", AuthController.logout);

export default router;
