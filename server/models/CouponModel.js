import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    off: {
        type: Number,
        required: true
    },
    minValue: {
        type: Number,
        required: true
    },
    maxDiscount: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Coupon', couponSchema)