import Coupon from "../models/CouponModel.js";
import User from "../models/UserModel.js";


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

export const checkoutCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { couponId } = req.body;

        // get user's cart
        const user = await User.findById(userId).populate("cart.productId");
        if (!user || !user.cart.length) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        // calculate total
        let total = 0;
        const productsForOrder = user.cart.map((item) => {
            total += item.productId.price * item.quantity;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            };
        });

        let discount = 0;
        let appliedCoupon = null;

        // validate coupon
        if (couponId) {
            const coupon = await Coupon.findById(couponId);
            if (coupon && total >= coupon.minValue) {
                discount = Math.min((coupon.off / 100) * total, coupon.maxDiscount);
                appliedCoupon = coupon;
            } else {
                return res.json({ success: false, message: "Invalid coupon" });
            }
        }

        const delivery = total > 0 && total < 300 ? 40 : 0;
        const grandTotal = total + delivery - discount;

        // push order to user.orders
        user.orders.push({
            products: productsForOrder,
            total,
            discount,
            delivery,
            grandTotal,
            appliedCoupon: appliedCoupon?._id
        });

        // clear cart
        user.cart = [];

        await user.save();

        return res.json({
            success: true,
            total,
            discount,
            delivery,
            grandTotal,
            appliedCoupon
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
