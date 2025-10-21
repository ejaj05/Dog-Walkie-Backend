const nodemailer = require("nodemailer")
require("dotenv").config();

const mailSend = async(email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,                           
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:"Walkie - By Ejaj Alam",
            to:email,
            subject:title,
            html:body
        })
        return info;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    mailSend
}