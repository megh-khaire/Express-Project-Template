module.exports.config = {
    // Server configuration
    server: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        server_hostname: process.env.SERVER_HOSTNAME + process.env.PORT,
        swagger_hostname: process.env.SWAGGER_HOSTNAME + process.env.PORT
    },
    // Database configuraton
    database: {
        uri: process.env.MONGO_URI
    },
    // jwt configuration
    jwt: {
        jwtSecret: process.env.JWT_SECRET,
        timeout: String(process.env.JWT_TIMEOUT), 
    },
    // Nodemailer configuration (Remove if email service is not required)
    nodemailer_conf: {
        host: process.env.MAILER_DOMAIN,
        port: process.env.MAILER_PORT,
        username: process.env.MAILER_USER_NAME,
        password: process.env.MAILER_USER_PASSWORD,
    }
}