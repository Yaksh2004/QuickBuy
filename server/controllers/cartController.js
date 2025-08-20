import Coupon from "../models/CouponModel.js";

export const getCart = async (req, res) => {
    res.json({ cart: req.user.cart });
}

export const addToCart = async(req, res) => {
    const { productId } = req.body;
  let item = req.user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity += 1;
  } else {
    req.user.cart.push({ productId, quantity: 1 });
  }

  await req.user.save();
  res.json({ cart: req.user.cart });
};

export const increaseQty = async (req, res) => {
  const { productId } = req.body;
  const item = req.user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity += 1;
    await req.user.save();
  }

  res.json({ cart: req.user.cart });
};

export const decreaseQty = async (req, res) => {
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
};

export const getCoupons = async (req, res) => {
    const coupons = await Coupon.find({});
    res.json({ coupons });
}