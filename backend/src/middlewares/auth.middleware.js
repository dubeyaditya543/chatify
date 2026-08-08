import jwt from "jsonwebtoken";
import { env } from "../lib/env.js";
import { User } from "../models/user.model.js";

export async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decodedInfo = jwt.verify(token, env.JWT_SECRET);
    if (!decodedInfo) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decodedInfo.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute", error)
    return res.status(500).json({message: "Internal server error"})
  }
}
