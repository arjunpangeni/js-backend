import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
user{}
}, { timestamps: true })

export const MedicalRecord = mongoose.model('MedicalRecord', recordSchema) 