const mongoose = require("mongoose")

module.exports = mongoose.model("experiences", new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    responsibilities: { type: [String], required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true }))