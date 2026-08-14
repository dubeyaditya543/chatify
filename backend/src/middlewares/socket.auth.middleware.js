import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { env } from "../lib/env.js"

export async function socketAuthMiddleware(socket, next){
  try {
    const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1]

    if(!token){
      console.error("Socket connection rejected: No token provided")
      return next(new Error("Unauthorized: No token found"))
    }

    const decodedInfo = jwt.verify(token, env.JWT_SECRET)
    if(!decodedInfo){
      return next(new Error("Invalid token provided"))
    }

    const user = await User.findById(decodedInfo.userId).select("-password")
    if(!user){
      return next(new Error("User not found"))
    }

    socket.user = user;
    socket.userId = user._id.toString()

    console.log("Socket connection authenticated")

    next()
  } catch (error) {
    console.error("Something went wrong with socket connection", error.message)
    next(new Error("Authentication failed"))
  }
}