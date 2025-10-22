const { ErrorHandler } = require("../utils/utility");
const { TryCatch } = require("./error");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const isAuth = TryCatch(async (req, res, next) => {


    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return next(new ErrorHandler('Token is missing', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = decode
    next()
})

const signToken = (payload, secret) => {
    return jwt.sign(payload, secret, { expiresIn: "30d" });
}

module.exports = {
    isAuth,
    signToken
}