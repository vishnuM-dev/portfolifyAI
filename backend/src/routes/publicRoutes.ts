import { Router } from "express";
import PublicController from "../controllers/publicController";

const router = Router();

// Publicly accessible portfolio by slug
router.get("/:slug", PublicController.getPublicPortfolio);
router.get("/portfolio/:slug", PublicController.getPublicPortfolio);

export default router;
