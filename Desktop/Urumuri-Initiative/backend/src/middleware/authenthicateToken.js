import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthorizedError, ForbiddenError } from "../error/index.js";
import { AppDataSource } from "../config/db.js";
import  User  from "../entity/userEntity.js";
dotenv.config();

// 1. Authenticate Token Middleware
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    if (decoded.agentCode) {
      req.agentCode = decoded.agentCode; // 👈 ADD THIS LINE
    }

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// 2. Authorize Middleware
export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user || typeof req.user === "string" || req.user.role !== role) {
      return next(new ForbiddenError("You do not have permission to perform this action"));
    }
    next();
  };
};
