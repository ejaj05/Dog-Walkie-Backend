const { body, validationResult } = require("express-validator")
const { ErrorHandler } = require("../utils/utility")

const validateHandler = (req, res, next) => {
    const { errors } = validationResult(req)
    const errorMessages = errors.map((error) => error.msg).join(",")
    console.log(errorMessages)

    errors.length == 0 ? next() : next(new ErrorHandler(errorMessages, 400))
}

const sentOtpValidator = () => [
    body("email", "Please Enter Your Email").notEmpty(),
    body("phoneNumber", "Please Enter Your Phone Number").notEmpty(),
    body("password", "Please Enter Your Password").notEmpty()
]

const signupValidator = () => [
    body("email", "Please Enter Your Email ID").notEmpty(),
    body("phoneNumber", "Please Enter Your Phone Number").notEmpty(),
    body("password", "Please Enter Your Password").notEmpty()
]

const loginValidator = () => [
    body("email", "Please Enter Your Email Id").notEmpty(),
    body("password", "Please Enter Your Password").notEmpty(),
]

const addProfileValidator = () => [
    body("fullName", "Please Enter Your Full Name").notEmpty(),
    body("address", "Please Enter Your Address").notEmpty(),
    body("postCode", "Please Enter Your Post Code").notEmpty(),
    body("accountNumber", "Please Enter Account Number").notEmpty(),
    body("bsb", "Please Enter Your BSB").notEmpty(),
    body("name", "Please Enter Account Holder Name").notEmpty(),
]


const dogValidator = () => [
    body("name", "Please Enter Your Dog Name").notEmpty(),
    body("breed", "Please Enter Breed Name").notEmpty(),
]

const dogWalkerValidator = () => [
    body("hourlyRate", "Please Enter Your Charges").notEmpty(),
    body("daysAvailable").isArray({ min: 1 }).withMessage("Days must be an array with at least one item"),
    body("timeAvailable")
        .isObject().withMessage("timeAvailable must be an object")
        .custom((obj) => {
            if (typeof obj.from === "undefined" || typeof obj.to === "undefined") {
                throw new Error("Both 'from' and 'to' fields are required");
            }
            if (obj.from < 0 || obj.to > 24 || obj.from >= obj.to) {
                throw new Error("'from' must be less than 'to' and between 0–24 hours");
            }
            return true;
        }),
    body("serviceArea", "Please Enter Area Of Service").notEmpty(),
]

const notificationValidator = () => [
    body("dogWalker", "Please Enter Dog Walker ID").notEmpty(),
    body("dogOwner", "Please Enter Dog Owner ID").notEmpty(),
]

const otpValidator = () => [
    body("otp", "Please Enter OTP").notEmpty(),
]

module.exports = {
    validateHandler,
    sentOtpValidator,
    signupValidator,
    loginValidator,
    dogValidator,
    dogWalkerValidator,
    notificationValidator,
    otpValidator,
    addProfileValidator
}