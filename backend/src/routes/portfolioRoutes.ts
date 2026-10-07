import { Router } from "express";
import multer from "multer";
import PortfolioController from "../controllers/portfolioController";
import authenticate from "../middleware/authMiddleware";

const router = Router();

// Memory storage for file uploads (max 15MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = file.originalname.toLowerCase().split(".").pop();
    if (ext === "pdf" || ext === "docx" || ext === "doc" || ext === "txt") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX and TXT resume files are supported."));
    }
  },
});

// Public portfolio retrieval by slug (No authentication required)
router.get("/public/:slug", PortfolioController.getPublicBySlug);

// All portfolio management endpoints below require authentication
router.use(authenticate);

// Portfolio CRUD
router.post("/", PortfolioController.create);
router.get("/", PortfolioController.getAll);
router.get("/:id", PortfolioController.getById);
router.put("/:id", PortfolioController.update);
router.delete("/:id", PortfolioController.delete);

// Publish & Unpublish actions
router.post("/:id/publish", PortfolioController.publish);
router.post("/:id/unpublish", PortfolioController.unpublish);

// Resume upload, parsing & intelligence
router.post("/parse-resume", upload.single("resume"), PortfolioController.parseResumeDirect);
router.post("/resume/quality", upload.single("resume"), PortfolioController.analyzeResumeQuality);
router.post("/:id/resume", upload.single("resume"), PortfolioController.uploadResume);
router.post("/:id/resume/quality", upload.single("resume"), PortfolioController.analyzeResumeQuality);
router.post("/:id/resume/compare", upload.single("resume"), PortfolioController.compareResume);
router.post("/:id/resume/merge", PortfolioController.mergeResumeData);

export default router;
