import User from "../models/UserModel.js"
import Product from "../models/ProductModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = (async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPass
        });
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
        res.json({
            msg: "User Created",
            token
        })
    } catch(e){
        res.json({
            error: e.message
        })
    }
})

export const loginUser = (async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ error: "User Email Not Found" });
        }
        const passMatch =await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token });
    } catch(e){
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error" });
    }
})
