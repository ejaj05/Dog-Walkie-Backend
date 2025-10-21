const mongoose = require("mongoose")
const { mailSend } = require("../utils/mailSender")
const { otpTemplate } = require("../mail/emailTemplate")
const { sendSms } = require("../utils/smsSender")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    emailOtp:{
        type:String,
        required:true,
    },
    phoneOtp:{
        type:String,
        required:true,
    },
    createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 10,                    // The document will be automatically deleted after 5 minutes of its creation time
	},
})


async function sendVerificationMail(email,otp){
    try {
       await mailSend(email,"One Time Password - Walkie",otpTemplate(otp))
        
    } catch (error) {
        console.log(error)
    }
}

async function sendVerificationSMS(phone,otp){
    try {
       await sendSms(phone,otp)
        
    } catch (error) {
        console.log(error)
    }
}

otpSchema.pre("save", function(next) {
    if(this.isNew){
        sendVerificationMail(this.email,this.emailOtp)
            .catch((err) => console.log(err))
        sendVerificationSMS("+61"+this.phoneNumber,this.phoneOtp)
            .catch((err) => console.log(err))
    }
    next()
})

const OTP = mongoose.model("Otps",otpSchema)
module.exports = {
    OTP
}