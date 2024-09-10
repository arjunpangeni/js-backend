import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({

}, { timestamps: true })

export const MedicalRecord = mongoose.model('MedicalRecord', recordSchema) 