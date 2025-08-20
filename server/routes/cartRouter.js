import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  res.json({ cart: req.user.cart });
});


router.post("/add", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  let item = req.user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity += 1;
  } else {
    req.user.cart.push({ productId, quantity: 1 });
  }

  await req.user.save();
  res.json({ cart: req.user.cart });
});


router.post("/increase", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const item = req.user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity += 1;
    await req.user.save();
  }

  res.json({ cart: req.user.cart });
});


router.post("/decrease", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const item = req.user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      req.user.cart = req.user.cart.filter(i => i.productId.toString() !== productId);
    }
    await req.user.save();
  }

  res.json({ cart: req.user.cart });
});

export default router;
