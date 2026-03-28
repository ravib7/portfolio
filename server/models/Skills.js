const mongoose = require("mongoose")

module.exports = mongoose.model("skills", new mongoose.Schema({
    skillName: { type: String, required: true },
    category: { type: String, enum: ["frontend", "backend"], required: true },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const num = parseInt(value)
                return num >= 0 && num <= 100
            },
            message: "Level must be between 0 and 100"
        }
    },
    order: { type: Number, default: 0 },
}, { timestamps: true }))