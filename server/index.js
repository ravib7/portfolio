require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { FRONTEND_URL } = require("./utils/config")

const app = express()
app.use(express.json())
app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(cookieParser())

// app.use("/api/auth", require("./routes/user.routes.js"))

app.use((req, res) => {
    res.status(404).json({ message: "resource not found" })
})

app.use((err, req, res, next) => {
    console.error("SERVER ERROR", err)
    res.status(500).json({ message: err.message || "SERVER ERROR" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, () => {
        console.log("server running...")
        console.log(`mode: ${process.env.NODE_ENV}`)
        console.log(`CORS ALLOWED: ${FRONTEND_URL}`)
    })
})

