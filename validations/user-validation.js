const Joi = require('joi');

module.exports.create = async(data) =>{
    const schema = Joi.object().keys({
        name:Joi.string(),
        email_id: Joi.string().email(),
        username: Joi.string(),
        password: Joi.string()
    });
    return await schema.validateAsync(data);
}

module.exports.login = async(data) =>{
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    return await schema.validateAsync(data)
}

module.exports.forgotPassword = async(data) =>{
    const schema = Joi.object().keys({
        email_id: Joi.string().email().required()
    })
    return await schema.validateAsync(data)
}

module.exports.resetPassword = async(data) =>{
    const schema = Joi.object().keys({
        password: Joi.string().required()
    })
    return await schema.validateAsync(data)
}

module.exports.changePassword = async(data) =>{
    const schema = Joi.object().keys({
        old_password: Joi.string().required(),
        password: Joi.string().required()
    })
    return await schema.validateAsync(data)
}

module.exports.update = async(data) =>{
    const schema = Joi.object().keys({
        name:Joi.string(),
        email_id: Joi.string().email(),
        username: Joi.string()
    });
    return await schema.validateAsync(data);
}