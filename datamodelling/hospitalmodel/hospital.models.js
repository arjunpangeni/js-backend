import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }, address: {
        type: String,
        required: true
    }, addressLine: {
        type: String,
        required: true
    }, city: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Hostpital = mongoose.model('Hospital', hospitalSchema)