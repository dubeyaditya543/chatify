import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export async function getAllContacts(req, res) {
  try {
    const loggedInUser = req?.user?._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password -email -createdAt -updatedAt");

    return res.status(200).json({ data: filteredUsers });
  } catch (error) {
    console.error("Get contacts controller failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllMessagesByUserId(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: loggedInUserId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get chats by user id controller failed", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl ?? "",
    });

    await newMessage.save();

    // todo: send message to the user in real time if the user is online - socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in send message controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getChatPartners(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const partnersIds = [
      ...new Set(
        messages.map((message) =>
          message.senderId.toString() === loggedInUserId.toString()
            ? message.receiverId
            : message.senderId,
        ),
      ),
    ];

    const partners = await User.find({ _id: { $in: partnersIds } }).select(
      "-password",
    );

    res.status(200).json(partners);
  } catch (error) {
    console.error("Error in get chat partners controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
