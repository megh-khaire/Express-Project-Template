const User = require('../models/user');
const {statuscodes} = require('../constants/constants');
const emails = require('../constants/emails');
const genericService = require('./general-service')

module.exports.create = async (body) =>{
    const user = await User.create(body)
    if(user){
        return {
            valid: true,
            data: user,
            message: "User Registered!"
        }
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

module.exports.verifyEmail = async(user)=>{
    user.verification_token = undefined
    user.updatedBy = user._id
    user.email_verification = true
    await user.save();
    return {
        valid: true,
        data: undefined,
        message: "Email Verified!"
    }
}

module.exports.sendVerificationEmail = async(user) =>{
    //Creating a email verification Token and saving it to database
    const verification_token = await user.generateAuthToken();
    user.verification_token = verification_token
    user.email_verification = false
    user.updatedBy = user._id
    const result = await user.save()
    //Mailing generated token to the user
    const link = emails.links.email_verification+verification_token
    const mailObj = {
        email: user.email_id,
        subject: emails.email_verification.subject,
        email_body: emails.email_verification.template(user.name, user.username, link),
    };
    await genericService.sendMail(mailObj)
    return {
        valid: true,
        data: undefined,
        message: "Verification Email Sent!"
    }
}

module.exports.login = async (body) =>{
    const user = await User.findByCredentials(body.username, body.password);
    if(!user){
        return {
            valid:false,
            message:"Incorrect email or password",
            statuscode:statuscodes.unauthorized
        }
    }
    if(user.status == 'inactive'){
        return {
            valid:false,
            message:"Your account is inactive!",
            statuscode:statuscodes.notAcceptable
        }
    }
    const token = await user.generateAuthToken();
    user.tokens = user.tokens.concat({token});
    await user.save();

    if(!token){
        return {
            valid:false,
            message:"Problem encountered while generating token",
            statuscode:statuscodes.internal
        }
    }
    return{
        valid: true,
        data:user,
        token: token, 
        message: "Successfull!"
    }
};

module.exports.logout = async (user_token,user_id) =>{
    const user = await User.findById({_id:user_id});
    if(user){
        user.tokens = user.tokens.filter((token) => {
            return token.token !== user_token;
        });
        user.updatedBy = user_id;
        const result = await user.save();
        return {
            valid: true,
            data: undefined,
            message: "Logged out successfully!",
        };
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

module.exports.logoutAll = async (user_id) => {
    const user = await User.findById({_id:user_id});
    if(user){
        user.tokens = [];
        user.updatedBy = user_id;
        const result = await user.save();
        return {
            valid: true,
            data: undefined,
            message: "Logged out of all devices",
        };
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

module.exports.profile = async (user_id) =>{
    const user = await User.findById({_id:user_id});
    if(user){
        return {
            valid: true,
            data: user,
            message: "Fetched!"
        }
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

//NOTE: USING SAVE BECAUSE OF EMAIL VERIFICATION (PRE FUNCTION DEFINED IN USER SCHEMA)
module.exports.update = async (user,body) =>{
    body.updatedBy = user._id;
    const updates = Object.keys(body)
    updates.forEach((update) => user[update] = body[update])
    await user.save()
    if(user){
        return {
            valid: true,
            data: user,
            message: "Updated!"
        }
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

module.exports.delete = async (user_id) => {
    const user = await User.findByIdAndDelete({_id:user_id});
    if(user){
        return {
            valid: true,
            data: undefined,
            message: "Deleted!"
        }
    }
    return {
        valid:false,
        message:"User not found!",
        statuscode:statuscodes.notFound
    }
};

module.exports.forgotPassword = async (body) => {
    const user = await User.findOne({email_id: body.email_id});
    if (user) {
        if (user.status == 'inactive') {
            return {
                valid: false,
                statuscode: statuscodes.notAcceptable,
                message: "Your account is inactive!",
            };
        }
        //Creating a reset Token and saving it to database
        const reset_token = await user.generateAuthToken();
        user.reset_token = reset_token
        user.updatedBy = user._id
        await user.save()
        
        //Mailing generated token to the user
        const link = emails.links.password_reset+reset_token
        const mailObj = {
            email: user.email_id,
            subject: emails.password_reset.subject,
            email_body: emails.password_reset.template(user.name,link),
        };
        await genericService.sendMail(mailObj)
        return{
            valid: true,
            data:undefined,
            token: reset_token, 
            message: "Email sent!",
            statuscode:statuscodes.success
        }
    } else {
        return {
            valid: false,
            statuscode: statuscodes.notFound,
            message: "User not found!",
        };
    }
};

module.exports.resetPassword = async (body, user) => {
    if (user) {
        if(await user.checkPassword(body.password)){
            return {
                valid: false,
                statuscode: statuscodes.conflict,
                message: "New Password cannot be same as old password",
            };
        }
        if (user.status == 'inactive') {
            return {
                valid: false,
                statuscode: statuscodes.notAcceptable,
                message: "Your account is inactive!",
            };
        }
        user.password = body.password
        user.reset_token = undefined
        user.updatedBy = user._id
        await user.save()
        return {
            valid: true,
            data: undefined,
            message: "Password Reset!",
        };
    }
    return {
        valid: false,
        statuscode:statuscodes.unauthorized,
        message: "Token is invalid or expired!",
    };
};

module.exports.changePassword = async (user_id, body) =>{
    //Old Password check!!
    const user = await User.findById({_id: user_id});
    if (user) {
        if(await user.checkPassword(body.old_password)){
            if(body.old_password == body.password){
                return {
                    valid: false,
                    statuscode: statuscodes.conflict,
                    message: "New Password cannot be same as old password",
                };
            }
            user.password = body.password;
            user.updatedBy = user_id;
            await user.save();
            return {
                valid: true,
                data: undefined,
                message: "Password Changed!",
            };
        } else {
            return {
                valid: false,
                statuscode: statuscodes.conflict,
                message: "Old password does not match!",
            };
        }
    } else {
        return {
            valid: false,
            statuscode: statuscodes.notFound,
            message: "User not found",
        };
    }
};