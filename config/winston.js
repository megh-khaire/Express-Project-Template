const winston = require('winston');
const path = require('path')
const errorLogPath = path.join(__dirname,'../log/error.log') 
const infoLogPath = path.join(__dirname,'../log/combined.log') 
const exceptionLogPath = path.join(__dirname,'../log/exceptions.log') 

const options = {
    error_file: {
        level: 'error',
        filename: errorLogPath,
        json:true,
        colorize: true,
    },
    info_file: {
        level: 'info',
        filename: infoLogPath,
        json: true,
        colorize: true,
    },
    exceptions_file: {
        filename: exceptionLogPath,
        json: true,
        colorize: true,
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.error_file),
        new winston.transports.File(options.info_file)
    ],
    exceptionHandlers: [
        new winston.transports.File(options.exceptions_file)
    ],
    rejectionHandlers: [
        new winston.transports.File(options.exceptions_file)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;