import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../interface/userInterface";

// Load environment variables
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

export interface CustomRequest extends Request {
  user?: IUser;
}

export const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Access Denied: No Token Provided" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid or Expired Token" });
      return;
    }

    req.user = decoded as IUser; // Attach user info to request
    next();
  });
};
