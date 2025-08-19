import express from "express"
const app = express();
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT || 3000;
import mongoose from "mongoose";
import userRouter  from './routes/userRouter.js'


app.use(express.json())
app.use('/user', userRouter)


mongoose.connect(process.env.MONGO_URI)
.then(() =>{ 
    console.log("Connected to Database")
    app.listen(PORT, () => {
        console.log(`server started on port on ${PORT}`);
    })
}
).catch((e) => console.log("Mongo Connection error", e))