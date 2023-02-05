//data validation 
const Joi = require('joi');

const validateUser = (user) => {
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(8).max(30).required(),
        confirmedPassword: Joi.string().min(8).max(30).required()
    }).unknown();
    return JoiSchema.validate(user)
}

const logInValidation = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(8).max(30).required()
    }).unknown();
    return JoiSchema.validate(user)
}


const productValidator = (product) => {
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        desc: Joi.string().min(10).max(1000).required(),
        img: Joi.string().min(3).max(1000).required(),
        categories: Joi.array(),
        size: Joi.string().min(1),
        color: Joi.string().min(3).max(10),
        price: Joi.number().min(1).required()
    }).unknown();
    return JoiSchema.validate(product)
}


module.exports = {
    validateUser,
    logInValidation,
    productValidator
}