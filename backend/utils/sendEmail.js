const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            password:SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        message:options.message
    };

   await transporter.sendMail(mailOptions)

}

module.exports= sendEmail;