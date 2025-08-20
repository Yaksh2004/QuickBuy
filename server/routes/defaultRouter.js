import express  from "express"
import { getproducts } from "../controllers/defaultController.js"
const router = express.Router()

router.get('/products', getproducts)

export default router