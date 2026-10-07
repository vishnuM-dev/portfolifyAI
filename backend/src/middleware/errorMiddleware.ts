import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[Server Error]", err.message);

  // Return clean JSON error without internal stack traces
  res.status(500).json({
    success: false,
    message: "An unexpected internal server error occurred. Please try again later.",
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: "Requested API endpoint not found.",
  });
}
