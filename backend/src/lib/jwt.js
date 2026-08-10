import jwt from "jsonwebtoken";
import { env } from "./env.js";

export function generateToken(userId, res) {
  const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure:
      env.NODE_ENV === "development" || env.NODE_ENV === "testing"
        ? false
        : true,
  });

  return token
}
