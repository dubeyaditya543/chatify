import {Resend} from "resend"
import { env } from "../lib/env.js"

export const resendClient = new Resend(env.RESEND_KEY)

export const sender = {
  email: env.EMAIL_DOMAIN,
  name: env.EMAIL_FROM
}