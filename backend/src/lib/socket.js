import http from "http"
import express from "express"
import {Server} from "socket.io"
import {env} from "./env.js"
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js"

export const app = express()
export const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: [env.CLIENT_URL],
    credentials: true
  }
})

io.use(socketAuthMiddleware)

const userSocketMap = {}

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.user.fullName)
  const userId = socket.userId
  userSocketMap[userId] = socket.id

  //io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("A use disconnected", socket.user.fullName)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})