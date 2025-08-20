import Product from "../models/ProductModel.js"
import User from "../models/UserModel.js"

export const getproducts = (async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            products
        })
    } catch(e){
        res.json({
            error: e.message
        })
    }
})

export const getLastOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        const lastOrder = user.orders[user.orders.length - 1];
        
        res.json({ order: lastOrder});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch last order" });
    }
};