import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envShema = z.object({
  NODE_ENV: z.enum(["production", "development", "testing"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, "MONGDB_URI is required"),
  CLIENT_URL: z.string().min(1, "Client url is required"),
  JWT_SECRET: z.string().min(32, "JWT SECRET must be at least 32 char"),
  RESEND_KEY: z.string().min(1, "Resend key is required"),
  EMAIL_FROM: z.string().min(1, "Sender name is required"),
  EMAIL_DOMAIN: z.string().min(1, "Sender domain is required")
})

const parsed = envShema.safeParse(process.env)

if (!parsed.success) {
  console.error(parsed.error.issues[0].message)
  process.exit(1)
}

export const env = parsed.data