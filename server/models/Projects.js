const mongoose = require("mongoose")

module.exports = mongoose.model("projects", new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ["web", "mobile"], required: true },
    technologies: { type: [String], required: true },
    imageURL: { type: String },
    liveURL: { type: String },
    gitHubURL: { type: String },
}, { timestamps: true }))