const jwt = require("jsonwebtoken")
const { PRODUCTION } = require("../utils/config")

exports.adminProtected = async (req, res, next) => {
    try {
        const adminToken = req.cookies.ADMIN

        if (!adminToken) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "unable to authenticate"
                    : "no cookie found"
            })
        }

        jwt.verify(adminToken, process.env.JWT_KEY, (err, data) => {

            if (err) {

                if (process.env.NODE_ENV !== PRODUCTION) {
                    console.log(err)
                }

                return res.status(401).json({
                    message: "Invalid or expired token"
                })
            }

            req.admin = data._id
            next()
        })

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) {
            console.log(error)
        }

        res.status(401).json({
            message: "unable to authenticate"
        })
    }
}

