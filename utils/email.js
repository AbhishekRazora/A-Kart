import nodemailer from "nodemailer"
// const nodemailer=require('nodemailer')
const sendEmail=async(option)=>{

    // CREATE A TRANSPORTER

    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

    // DEFINE EMAIL OPTIONS

    const emailOptions={
        from:'A-Kart support<support@A-kart.com>',
        to:option.email,
        subject:option.subject,
        text:option.message,
        html:option.html
    }
    await transporter.sendMail(emailOptions)
}

export default sendEmail