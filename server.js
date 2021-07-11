const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const app = require('./app')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
const AppError = require('./config/appError');
const globalErrorHandler = require('./controllers/error-controller')
const {config} = require('./config/config')

// Swagger setup
// Definition
const swaggerDefinition = {
    info: {
        title: 'My Website',
        version: '1.0.0',
        description: 'Express API documentation for <Website>',
    },
    host: config.server.swagger_hostname,
    basePath: '/api/v2',
};
  
// Options
const options = {
    swaggerDefinition: swaggerDefinition,
    explorer: true,
    apis: ['./routes/swagger-routes/*.js'],
};
  
const swaggerDocument = swaggerJSDoc(options);
  
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Establishing connection with the mongodb cluster
mongoose.connect(config.database.uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection established");
}).catch(err => console.log(`Unable to establish connection with MongoDB \n Error: ${err}`))

const port = config.server.port;
//Bind the server to listen on port.
const server = app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

//##########Error Handling Routes##########//
//Undefined Routes Error
//Should be placed last!!!!
app.all('*',(req,res,next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

//Global Error Handler
app.use(globalErrorHandler);