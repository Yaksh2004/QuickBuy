import User from "../models/UserModel.js"
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

