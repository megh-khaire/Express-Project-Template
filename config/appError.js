//Class for Error Handling
class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        //Setting isOperational property to classify Operational Error
        this.isOperational = true;
        //Caturing Stack Trace
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;