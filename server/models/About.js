const mongoose = require("mongoose")

module.exports = mongoose.model("About", new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    introduction: { type: String, required: true },
    journey: { type: String },
    currentWork: { type: String },
    dob: { type: String },
    location: { type: String, required: true, trim: true },
    email: {
        type: String, required: true, unique: true, lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    phone: { type: String, required: true, trim: true },
    languages: { type: [String], default: [] },
    profileImage: { type: String, default: "" },
}, { timestamps: true }))