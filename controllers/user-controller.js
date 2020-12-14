//Author - Megh Khaire
const validation = require('../validations/user-validation')
const service = require('../services/user-service')
const {response} = require('../services/general-service')
const catchAsync = require('../config/catchAsync');
const AppError = require('../config/appError')

//Api to create new profile
module.exports.create = catchAsync(async(req,res,next) => {
    const validate = await validation.create(req.body)
    const result = await service.create(req.body)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to verify email
module.exports.verifyEmail = catchAsync(async(req,res,next) => {
    const result = await service.verifyEmail(req.user)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to send verification email
module.exports.sendVerificationEmail = catchAsync(async(req,res,next) => {
    const result = await service.sendVerificationEmail(req.user)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to log into an existing account
module.exports.login = catchAsync(async(req,res,next) => {
    const validate = await validation.login(req.body)
    const result = await service.login(req.body)
    if(result.valid){
        return response(req, res, result.message, result.data, result.token)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to send email for password reset
module.exports.forgotPassword = catchAsync(async(req,res,next) => {
    const validate = await validation.forgotPassword(req.body)
    const result = await service.forgotPassword(req.body)
    if(result.valid){
        return response(req, res, result.message, result.data, result.token)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to reset password
module.exports.resetPassword = catchAsync(async(req,res,next) => {
    const validate = await validation.resetPassword(req.body)
    const result = await service.resetPassword(req.body, req.user)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to change password
module.exports.changePassword = catchAsync(async(req,res,next) => {
    const validate = await validation.changePassword(req.body)
    const result = await service.changePassword(req.user._id,req.body)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to update profile
module.exports.update = catchAsync(async(req,res,next) => {
    const validate = await validation.update(req.body)
    const result = await service.update(req.user,req.body)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to get profile info
module.exports.profile = catchAsync(async(req,res,next) => {
    const result = await service.profile(req.user._id)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to delete profile
module.exports.delete = catchAsync(async(req,res,next) => {
    const result = await service.delete(req.user._id)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to logout of current account
module.exports.logout = catchAsync(async(req,res,next) => {
    const result = await service.logout(req.token, req.user._id)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});

//Api to logout of all accounts
module.exports.logoutAll = catchAsync(async(req,res,next) => {
    const result = await service.logoutAll(req.user._id)
    if(result.valid){
        return response(req, res, result.message, result.data)
    }else{
        return next(new AppError(result.message,result.statuscode));
    }
});