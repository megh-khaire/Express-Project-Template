const AppError = require('../config/appError');
const { config } = require('../config/config');
const {statuscodes} = require('./../constants/constants');
const winston = require('../config/winston');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}.`
    return new AppError(message, statuscodes.badRequest);
}

//Handling Duplicate fields while updating
const handleDuplicateFieldsDB = err => {
    let value;
    if(err.msg){
        value =err.errmsg //.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    }else{
        value =err.message
    }
    const message  = `${value}. Please use another value!`;
    return new AppError(message,statuscodes.conflict);
}

//Handles Mongoose unique error
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `${errors.join(' ')}`;
    return new AppError(message,statuscodes.conflict);
}

const handleJWTError = () => {
    const message = 'Invalid token! Please login again';
    return new AppError(message,statuscodes.unauthorized);
}

const handleJWTExpiredError = () =>{
    const message = 'Your token has expired! Please login again.';
    return new AppError(message,statuscodes.unauthorized);
}

const handleJoiError = (err) =>{
    for (details in err.details) {
        const type = err.details[details].type
        const message = String(err.details[details].message)
        if (type == 'object.allowUnknown') {
            return new AppError(message,statuscodes.badRequest)
        }else if (type == 'any.required') {
            return new AppError(message,statuscodes.badRequest)
        }else if (type == 'any.empty') {
            return new AppError(message,statuscodes.badRequest)
        }else if (type == 'string.min') {
            return new AppError(message,statuscodes.invalid)
        }else if (type == 'string.max') {
            return new AppError(message,statuscodes.invalid)
        }else if(type == 'string.regex.base'){
            return new AppError(message,statuscodes.invalid)
        }else{
            return new AppError(message,statuscodes.invalid)
        }
    }
}

//Handle Swagger Error
const handleSwaggerError = err => {
    const errmsg = err.message;
    const message = `Swagger Syntax Error: ${errmsg}`;
    return new AppError(message,statuscodes.badRequest);
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || statuscodes.internal;
    err.status = err.status || 'Error';
    if(err.name === 'CastError') err = handleCastErrorDB(err);
    if(err.codeName === 'DuplicateKey') err = handleDuplicateFieldsDB(err);
    if(err.name === 'ValidationError') {
        if(err.isJoi){
            err = handleJoiError(err);
        }else{
            err = handleValidationErrorDB(err);
        }
    }
    if(err.name === 'JsonWebTokenError') err = handleJWTError();
    if(err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    if(err.type === 'entity.parse.failed') err = handleSwaggerError(err);
    //Operational Error: Send to Client
    if(err.isOperational){
        winston.error(`${err.status} - ${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    }//Programming or other unknown error: don't leak error details    
    else{
        winston.error(`Internal Error - ${err}`);
        res.status(statuscodes.internal).json({
            message: 'Something went wrong! Please try again later',
            status: 'Fail'
        });
        if(config.server.env == 'development'){
            console.log(err.stack)
        }
    }
};