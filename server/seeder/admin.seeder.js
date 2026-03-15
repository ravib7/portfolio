require("dotenv").config({ path: "./../.env" })
const mongoose = require("mongoose")
const User = require("../models/User")

exports.seedAdmin = async () => {
    try {

        if (!process.env.MONGO_URL || !process.env.ADMIN_EMAIL || !process.env.ADMIN_NAME) {
            console.error("Missing required environment variables")
            process.exit(1)
        }

        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")

        const adminRole = await User.findOne({ role: "admin" })

        if (adminRole) {
            console.log("admin already exist")
            await mongoose.connection.close()
            process.exit(0)
        }

        const admin = await User.findOne({ email: process.env.ADMIN_EMAIL })

        if (admin) {
            console.log("admin already exist")
            await mongoose.connection.close()
            process.exit(0)
        }

        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL
        })

        console.log("admin seed complete")
        await mongoose.connection.close()
        process.exit(0)

    } catch (error) {

        console.error("seed error:", error.message)
        process.exit(1)
    }
}

