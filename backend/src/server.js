import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})