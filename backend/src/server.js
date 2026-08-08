import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})