const mongoose = require("mongoose")

module.exports = mongoose.model("skills", new mongoose.Schema({
    skillName: { type: String, required: true },
    category: { type: String, enum: ["frontend", "backend"], required: true },
    level: { type: Number, min: 1, max: 100, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true }))