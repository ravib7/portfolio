const mongoose = require("mongoose")

module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    otp: { type: String },
    otpSendOn: { type: Date },
    otpExpiry: { type: Date },
}, { timestamps: true }))