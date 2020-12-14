const {config} = require("../config/config");
const nodemailer =  require("nodemailer");

module.exports.response  = (req, res, message, data, token=undefined, statuscode=200) => {
    res.status(statuscode).json({
        data,
        message:message,
        token:token
    });
};

const transporter = nodemailer.createTransport({
    host: config.nodemailer_conf.host,
    port: config.nodemailer_conf.port,
//  secure: true,
    auth: {
      user: config.nodemailer_conf.username,
      pass: config.nodemailer_conf.password,
    }
});

 module.exports.sendMail = async function(emailObj){
    const mailOptions  = await transporter.sendMail({
        from: config.nodemailer_conf.username,
        to: emailObj.email, 
        subject: emailObj.subject,
        html: emailObj.email_body, 
    });
 }