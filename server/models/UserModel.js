import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
        },
    ],
    orders: [
        {
            products: [
                {
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                    quantity: Number,
                    price: Number
                }
            ],
            total: Number,
            discount: Number,
            delivery: Number,
            grandTotal: Number,
            appliedCoupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
            createdAt: { type: Date, default: Date.now }
        }
    ]
})

export default mongoose.model('User', userSchema)
