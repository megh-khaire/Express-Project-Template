const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config')
const emails = require('../constants/emails');
const genericService = require('../services/general-service')

const userSchema = new Schema({
    name: {
        type: String,
        trim:true,
    },
    email_id: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        trim:true,
    },
    status: {
        type:String,
        enum:['active','inactive'],
        default: 'active'
    },
    tokens: [{
        token: {
            type:String
        }
    }],
    uri:String,
    email_verification:{
        type:Boolean,
        default: false
    },
    reset_token:String,
    verification_token:String,
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},{
    timestamps:true
})

//Function to hide password and tokens while retriving data
userSchema.methods.toJSON= function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//Funtion to generate token
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({id : user._id}, config.jwt.jwtSecret, {expiresIn:config.jwt.timeout});
    return token;
}

//User Login Function
userSchema.statics.findByCredentials = async (username,password) =>{
    const user = await User.findOne({username})
    if(!user){
        return;
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return;
    }
    return user
}

userSchema.methods.checkPassword = async function(password) {
    const old_password = this.password
    return await bcrypt.compare(password,old_password)
}

//middleware to hash password before add and update operations
//to send verification email before 
userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    if (user.isModified('email_id')) {
        const verification_token = await user.generateAuthToken();
        user.verification_token = verification_token
        user.email_verification = false
        user.updatedBy = user._id
        //Mailing generated token to the user
        const link = emails.links.email_verification+verification_token
        const mailObj = {
            email: user.email_id,
            subject: emails.email_verification.subject,
            email_body: emails.email_verification.template(user.name, user.username, link),
        };
        await genericService.sendMail(mailObj)
    }
    next()
});

userSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

//Required export, do not change
const User = mongoose.model('users',userSchema)
module.exports = User

//statics methods are called using Model
//methods methods are called using instance