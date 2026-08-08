import { Router } from "express";
import { login, signup, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectedRoute, updateProfile)

router.get("/check", protectedRoute, (req, res) => res.status(200).json(req.user))

export default router