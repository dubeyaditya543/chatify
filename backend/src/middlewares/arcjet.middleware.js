import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export async function arcjetProtectFn(req, res, next) {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Rate limit exceeded" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "access denied by security policy" });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoof bot detected",
        message: "malicious activity detected",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet protection error", error);
    next();
  }
}
