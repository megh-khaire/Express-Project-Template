//Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const winston = require('./config/winston')
const {config} = require('./config/config')
const bodyParser = require('body-parser')
const path = require('path')

//Depedencies for increasing security
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express()

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Ensuring Cors is used and server parses json files
if(config.server.env == 'production'){
    app.use(morgan('combined', { stream: winston.stream }));
}else if(config.server.env == 'development'){
    app.use(morgan('dev'));
}

const  whitelist = ['http://localhost:5000','http://localhost:3000'];
  
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
  
app.use(cors(corsOptionsDelegate));
app.use(cors());
app.use(express.json());

//GLOBAL MIDDLEWARES
//Set security HTTP Headers
app.use(helmet());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp()); //pass an object to specify whitelist

//Importing routes 
const userRouter = require('./routes/user-routes');

const public = path.join(__dirname, 'public')
app.use(express.static(public))
app.get('/', function(req, res) {
  res.send('Welcome to The Bug Tracker!!!');
});

//View Routes
app.use('/api/v2',[userRouter]);

module.exports = app;