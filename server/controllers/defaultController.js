import Product from "../models/ProductModel.js"

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