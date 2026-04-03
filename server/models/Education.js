const mongoose = require("mongoose")

module.exports = mongoose.model("education", new mongoose.Schema({
    degree: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true }
}, { timestamps: true }))