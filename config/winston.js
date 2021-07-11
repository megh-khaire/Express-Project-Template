const winston = require('winston');
const path = require('path')
const errorLogPath = path.join(__dirname,'../log/error.log') 
const infoLogPath = path.join(__dirname,'../log/combined.log') 
const exceptionLogPath = path.join(__dirname,'../log/exceptions.log') 

// Winston logger configuration
const options = {
    // Config for logging errors seperately -> stored in log/error.log
    error_file: {
        level: 'error',
        filename: errorLogPath,
        json:true,
        colorize: true,
    },
    // Config for general log -> stored in log/combined.log
    info_file: {
        level: 'info',
        filename: infoLogPath,
        json: true,
        colorize: true,
    },
    // Config for logging exceptions seperately -> stored in log/exceptions.log
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
    // Both execeptions and rejections are stored in the same file -> log/exceptions.log
    exceptionHandlers: [
        new winston.transports.File(options.exceptions_file)
    ],
    rejectionHandlers: [
        new winston.transports.File(options.exceptions_file)
    ],
    exitOnError: false, // Exception will be logged and the process will continue.
    // Set exitOnError: true to end the node process after handling exception just like node's default behavior. 
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;