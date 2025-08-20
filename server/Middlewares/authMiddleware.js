import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
