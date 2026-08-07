import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const router = Router()

router.post("/signup", signup)

router.get("/login", (req, res) => {
  res.status(200).json({message: "Welcome to login route", success: true})
})

export default router