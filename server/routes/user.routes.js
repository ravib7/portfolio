const router = require("express").Router()
const auth = require("../controllers/auth.controller.js")
const { adminProtected } = require("../middleware/auth.middleware")

router
    .post("/send-otp", auth.sendOTP)
    .post("/verify-otp", auth.verifyOTP)
    .post("/signout", adminProtected, auth.adminLogout)

module.exports = router