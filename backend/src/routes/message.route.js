import { Router } from "express";
import {
  getAllContacts,
  getAllMessagesByUserId,
  getChatPartners,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getAllMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
