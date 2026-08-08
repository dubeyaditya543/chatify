import { sendWelcomeEmail } from "../emails/email.handler.js";
import cloudinary from "../lib/cloudinary.js";
import { env } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  const validFullName = fullName.length > 0 ? fullName.trim() : "";
  const validEmail = email.length > 0 ? email.trim() : "";

  try {
    if (!validFullName || !validEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 char long" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(validEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email: validEmail });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: validFullName,
      email: validEmail.toLowerCase(),
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName,
        email,
        profilePic: newUser.profilePic ?? "",
        createdAt: newUser.createdAt,
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

export async function login(req, res) {
  const { email, password } = req.body;

  const validEmail = email.length > 0 ? email.trim() : "";

  try {
    if (!validEmail || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ email: validEmail });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic ?? "",
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({ message: "Logged out successfully" });
}

export async function updateProfile(req, res) {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    return res.status(200).json({data: updatedUser})
  } catch (error) {
    console.error("Error in profile update", error)
    return res.status(500).json({message: "Internal server error"})
  }
}
