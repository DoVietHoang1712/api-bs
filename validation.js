const Joi = require('joi');

const RegisterValid = async (data) => {
    const Schema = {
        name: Joi.string().required().min(6),
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6)
    };
    return Joi.validate(data, Schema);
}

const LoginValid = (data) => {
    const Schema = {
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6)
    }
    return Joi.validate(data, Schema);
}

module.exports = {RegisterValid, LoginValid};