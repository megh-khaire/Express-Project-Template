module.exports.config = {
    server: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        server_hostname: process.env.SERVER_HOSTNAME+process.env.PORT,
        swagger_hostname: process.env.SWAGGER_HOSTNAME+process.env.PORT
    },
    database: {
        uri: process.env.ATLAS_URI
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET,
        timeout: String(process.env.JWT_TIMEOUT), 
    },
    nodemailer_conf: {
        host: process.env.MAILER_DOMAIN,
        port: process.env.MAILER_PORT,
        username: process.env.MAILER_USER_NAME,
        password: process.env.MAILER_USER_PASSWORD,
    }
}