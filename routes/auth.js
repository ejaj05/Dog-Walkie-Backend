const express = require("express")
const { sendOtp, signup, validateOtp, login } = require("../controllers/auth")
const {fileUpload} = require("../middleware/multer")
const { loginValidator, validateHandler, sentOtpValidator } = require("../lib/validator")

const authRouter = express.Router()

authRouter.post("/send-otp",sentOtpValidator(),validateHandler,sendOtp)
authRouter.post("/validate-otp",validateOtp)
authRouter.post("/create-account",signup)
authRouter.post("/login",loginValidator(),validateHandler,login)


module.exports = {
    authRouter
}