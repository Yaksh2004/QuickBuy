const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');


app.get('/try', (req,res) => {
    res.send("Hello")
})


mongoose.connect(process.env.MONGO_URI)
.then(() =>{ 
    console.log("Connected to Database")
    app.listen(PORT, () => {
        console.log(`server started on port on ${PORT}`);
    })
}
).catch((e) => console.log("Mongo Connection error", e))