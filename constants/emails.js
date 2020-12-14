// This file is required while using nodemailer
// If nodemailer is not required in your project you can delete this file

const {config} = require('./../config/config')
const emails = {
    links: {
        password_reset: `<Insert link for password reset>`,
        email_verification: `<Insert link for email verification>`
    },
    password_reset:{
        subject: "Password Reset",
        template: (name, link) => {
            return `Hello ${name},<br><br>
            To reset your password, please click the following link: <a href=${link}>Reset Password</a><br><br>
            Please Note : This Link will expire within 5 days. If you cannot access this link, copy and paste the entire URL into your browser.<br><br>
            Thanks and Regards,<br><Insert Name>`;
        }
    },
    email_verification: {
        subject: 'TeBugger - Email Verification',
        template: (name, username, link) =>{
            return `Hello ${name},<br><br>
            Your username is ${username}.<br>
            To confirm your email address, please click the following link: <a href=${link}>Verify Email</a><br><br>
            Please Note : This Link will expire within 5 days. If you cannot access this link, copy and paste the entire URL into your browser.<br><br>
            Thanks and Regards,<br><Insert Name>`;
        }
    },
}

module.exports = emails;