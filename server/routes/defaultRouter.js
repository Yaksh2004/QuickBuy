import express  from "express"
import { getproducts, getLastOrder, getOrders } from "../controllers/defaultController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.get('/products', getproducts)
router.get('/orders', authMiddleware, getOrders)
router.get('/orders/last', authMiddleware, getLastOrder)

export default router