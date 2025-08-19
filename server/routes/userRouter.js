import express  from "express"
const router = express.Router()
import { registerUser, loginUser } from "../controllers/userController.js"
import { newUserValidate, loginUserValidate } from "../Middlewares/userMiddleware.js"

router.post('/register', newUserValidate , registerUser)
router.post('/login', loginUserValidate , loginUser)

export default router