import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import { env } from "./lib/env.js"
import { app, server } from "./lib/socket.js"

app.use(express.json({limit: "10mb"}))
app.use(cookieParser())
app.use(cors({origin: env.CLIENT_URL, credentials: true}))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", messageRoutes)

server.listen(env.PORT, () => {
  connectDB()
  console.log(`Server running on port ${env.PORT}`)
})