import express from "express"
const app = express();
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT || 3000;
import cors from 'cors'
import mongoose from 'mongoose'

import userRouter  from './routes/userRouter.js'
import defaultRouter from './routes/defaultRouter.js'
import cartRouter from "./routes/cartRouter.js";


app.use(cors())
app.use(express.json())
app.use('/', defaultRouter)
app.use('/user', userRouter)
app.use("/cart", cartRouter);


mongoose.connect(process.env.MONGO_URI)
.then(() =>{ 
    console.log("Connected to Database")
    app.listen(PORT, () => {
        console.log(`server started on port on ${PORT}`);
    })
}
).catch((e) => console.log("Mongo Connection error", e))