import { Router } from "express";
import UserController from "../controllers/userController";
import authenticate from "../middleware/authMiddleware";

const router = Router();

// Protected user profile route
router.get("/profile", authenticate, UserController.getProfile);

export default router;
