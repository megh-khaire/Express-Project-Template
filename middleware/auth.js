const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('./catchAsync');
const AppError = require('../config/appError');
const {config} = require('../config/config')
const {statuscodes} = require('../constants/constants');

const isValidToken = async (token) => {
    if (token) {
        token = token.replace("JWT ", "").replace("Bearer ", "");
        data = jwt.verify(token, config.jwt.jwtSecret);
        return {
            valid: true,
            data: data,
            token: token,
        };
    }
    return {
        valid: false
    };
};

module.exports.auth = catchAsync(async (req,res,next) => {
    const token = await isValidToken(req.headers["authorization"]);
    if(!token.valid){
        return next(new AppError("You're not logged in. Please login to get access!",statuscodes.unauthorized))
    }
    const decoded_data = token.data;
    //Find user with the correct username who has that authentication token still stored
    const user = await User.findOne({_id:decoded_data.id, 'tokens.token':token.token})
    if(!user){
        return next(new AppError('Token belonging to this user no longer exist!',statuscodes.unauthorized));
    }
    if(user.status == 'inactive'){
        return next(new AppError('Your account is inactive!',statuscodes.notAllowed));
    }
    req.user=user
    req.token=token.token
    next()
});

//Middleware Function for Authorization
module.exports.restrict = (...roles) => {
    return(req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("You don't have permission to perform this action!",statuscodes.notAllowed))
        }
        next()
    }
};

module.exports.resetAuth = catchAsync(async(req, res, next) => {
    try {
        const token = await isValidToken(req.headers["authorization"]);
        if (!token.valid) {
            return next(new AppError("This link has been expired or is invalid", statuscodes.unauthorized));
        }
        const user = await User.findOne({
            _id : token.data.id,
            reset_token : token.token
        });
        if (!user) {
            return next(new AppError("This link has been expired or is invalid", statuscodes.unauthorized));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(error)
    }
});

module.exports.emailAuth = catchAsync(async (req, res, next) =>{
    try {
        const token = await isValidToken(req.query.token);
        if (!token.valid) {
            return next(new AppError("This link has been expired or is invalid", statuscodes.unauthorized));
        }
        const user = await User.findOne({
            _id: token.data.id,
            verification_token: token.token
        });
        if (!user) {
            return next(new AppError("This link has been expired or is invalid", statuscodes.unauthorized));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(error);
    }
});