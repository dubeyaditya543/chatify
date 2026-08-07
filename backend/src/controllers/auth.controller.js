import { sendWelcomeEmail } from "../emails/email.handler.js";
import { env } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 char long" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName,
        email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          env.CLIENT_URL,
        );
      } catch (error) {
        console.error("Something went wrong", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user details" });
    }
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
