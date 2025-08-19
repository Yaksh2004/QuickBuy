import express  from "express"
const router = express.Router()
import { registerUser } from "../controllers/userController.js"
import { newUserValidate } from "../Middlewares/userMiddleware.js"

router.post('/register', newUserValidate , registerUser)

export default router