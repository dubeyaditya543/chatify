import { Router } from "express";

const router = Router()

router.get("/signup", (req, res) => {
  res.status(200).json({message: "Welcome to signup route", success: true})
})

router.get("/login", (req, res) => {
  res.status(200).json({message: "Welcome to login route", success: true})
})

export default router