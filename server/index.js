import express from "express"
const app = express();
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT || 3000;
import userRouter  from './routes/userRouter.js'
import cors from 'cors'
import mongoose from 'mongoose'
import Product from "./models/ProductModel.js"

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)



app.get('/products', (async (req, res) => {
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
}))


mongoose.connect(process.env.MONGO_URI)
.then(() =>{ 
    console.log("Connected to Database")
    app.listen(PORT, () => {
        console.log(`server started on port on ${PORT}`);
    })
}
).catch((e) => console.log("Mongo Connection error", e))