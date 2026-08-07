import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./email.template.js";

export async function sendWelcomeEmail(email, name, clientURL) {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chatify!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if(error){
    console.error("Something went wrong", error.message)
    throw new Error("Failed to send emails")
  }

  console.log("Email sent successfully", data)
}
