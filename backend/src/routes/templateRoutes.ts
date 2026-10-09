import { Router } from "express";
import TemplateController from "../controllers/templateController";

const router = Router();

// Publicly accessible template listings and details
router.get("/", TemplateController.getAll);
router.get("/:id", TemplateController.getById);

export default router;
