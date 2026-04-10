const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { differenceInSeconds } = require("date-fns")
const { PRODUCTION } = require("../utils/config")
const { sendEmail } = require("../utils/email")
const { otpTemplate } = require("../email-template/otpTemplate")

exports.sendOTP = asyncHandler(async (req, res) => {

    const admin = await User.findOne({ role: "admin" })

    if (!admin) {
        return res.status(400).json({ message: "Admin Not Found" })
    }

    const otp = crypto.randomInt(100000, 1000000)

    const hashOTP = await bcrypt.hash(String(otp), 10)

    await User.findByIdAndUpdate(admin._id, { otp: hashOTP, otpSendOn: new Date() })

    await sendEmail({
        email: admin.email,
        subject: "Login OTP",
        message: otpTemplate({
            name: admin.name,
            otp,
            sec: process.env.OTP_EXIPIREY,
            min: process.env.OTP_EXIPIREY / 60,
        })
    })

    res.json({ message: "OTP Send Successfully" })
})

exports.verifyOTP = asyncHandler(async (req, res) => {

    const { otp } = req.body

    const result = await User.findOne({ role: "admin" })

    if (!result) {
        return res.status(400).json({ message: "Admin Not Found" })
    }

    const verify = await bcrypt.compare(otp, result.otp)

    if (!verify) {
        return res.status(400).json({ message: "invalid otp" })
    }

    if (differenceInSeconds(new Date(), new Date(result.otpSendOn)) > process.env.OTP_EXIPIREY) {
        await User.findByIdAndUpdate(result._id, { otp: null })
        return res.status(400).json({ message: "otp expired" })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })

    res.cookie("ADMIN", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
        maxAge: 1000 * 60 * 60
    })

    res.status(200).json({
        message: "OTP Verify Successfully", result: {
            name: result.name
        }
    })
})

exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("ADMIN")
    res.json({ message: "Admin Logout Successfully" })
})