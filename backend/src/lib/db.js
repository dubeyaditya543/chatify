import mongoose from "mongoose"
import { env } from "./env.js"

export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI)
    console.log("MONGODB connected successfully: " + conn.connection.host)
  } catch {
    console.error("Error connecting to mongodb")
    process.exit(1)
  }
}