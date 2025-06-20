import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/authRequest";

const SECRET = process.env.TASK_MANAGER_JWT_SECRET || "";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).json({ message: "Access Denied!" });
    return;
  }

  try {
    const payload = jwt.verify(token, SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token Invalid!" });
  }
};
