import { Router } from "express";
import {
  login,
  signup,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtectFn } from "../middlewares/arcjet.middleware.js";

const router = Router();

router.use(arcjetProtectFn)

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
