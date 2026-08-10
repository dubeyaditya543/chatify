import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import { env } from "./lib/env.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", messageRoutes)

app.listen(env.PORT, () => {
  connectDB()
  console.log(`Server running on port ${env.PORT}`)
})