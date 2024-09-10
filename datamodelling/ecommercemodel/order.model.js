import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        require: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        require: true

    }, customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, orderItems: {
        type: [orderItemSchema]
    }, address: {
        type: String,
        required: true
    }, status: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered']
        , default: "Pending"
    }
}, { timestamps: true })


export const Order = mongoose.model('Order', orderSchema)