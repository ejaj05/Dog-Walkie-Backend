const { TryCatch } = require("../middleware/error");
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator');
const { User } = require("../models/user");
const { ErrorHandler } = require("../utils/utility");
const { OTP } = require("../models/otp");
const { signToken } = require("../middleware/auth");
require("dotenv").config()



const sendOtp = TryCatch(async (req, res, next) => {
    const { email, phoneNumber } = req.body;
    const user = await User.findOne({ email })

    if (user) {
        return next(new ErrorHandler("User Already Exist", 400))
    }
    const emailOtp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
    const phoneOtp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    console.log(emailOtp," ",phoneOtp)

    const result = await OTP.create({ email, phoneNumber, emailOtp, phoneOtp })

    res.status(200).json({
        success: true,
        message: "OTP Send Successfully"
    })
})

const validateOtp = TryCatch(async (req, res, next) => {
    const { email, emailOtp, phoneOtp } = req.body;

    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentOtp.length === 0) {
        return next(new ErrorHandler("OTP not found", 400))
    }

    if (emailOtp != recentOtp[0].emailOtp) {
        return next(new ErrorHandler("Invalid Email OTP", 400))
    }

    if (phoneOtp != recentOtp[0].phoneOtp) {
        return next(new ErrorHandler("Invalid Phone OTP", 400))
    }

    return res.status(200).json({
        success: true,
        message: "OTP verified Successfully"
    })
})

const signup = TryCatch(async (req, res, next) => {

    const { email, password, phoneNumber, role } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User Already Exist", 400))
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashPassword, phoneNumber, role })
    const payload = {
        id: newUser._id,
        email,
        role
    }
    const token = signToken(payload, process.env.JWT_SECRET);

    console.log(token)

    return res.status(200).json({
        success: true,
        token,
        user: newUser
    })
})

const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("User Not Found", 400))
    }
    if (!bcrypt.compare(password, user.password)) {
        return next(new ErrorHandler("Incorrect Password", 400))
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const token = signToken(payload, process.env.JWT_SECRET);
    const options = {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("Walkie-token", token, options).json({
        success: true,
        token,
        user,
        message: "Login Successfully"
    })
})

module.exports = {
    sendOtp,
    validateOtp,
    signup,
    login,
}