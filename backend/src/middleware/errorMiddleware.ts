import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[Server Error]", err.message || err);

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "File exceeds maximum size limit of 15MB.",
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: err.message || "File upload failed.",
    });
    return;
  }

  if (err.message && (err.message.includes("PDF, DOC") || err.message.includes("supported resume file format"))) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  const statusCode = typeof err.status === "number" ? err.status : 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode < 500 ? (err.message || "Request failed.") : "An unexpected internal server error occurred. Please try again later.",
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: "Requested API endpoint not found.",
  });
}
