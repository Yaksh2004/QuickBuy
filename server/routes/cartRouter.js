import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addToCart, decreaseQty, getCart, increaseQty, getCoupons, checkoutCart } from "../controllers/cartController.js"; 

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/increase", authMiddleware, increaseQty);
router.post("/decrease", authMiddleware, decreaseQty);
router.get("/coupons", getCoupons);
router.post("/checkout", authMiddleware, checkoutCart);
export default router;
