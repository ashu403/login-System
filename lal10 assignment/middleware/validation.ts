import { Joi } from 'express-validation'


export const loginValidation: Object = {
    body: Joi.object({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .required()
            .min(6)
            .max(8)
    })
}

export const regestrationValidation: Object = {
    body: Joi.object({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .required()
            .min(6)
            .max(8),
        userName: Joi.string()
            .trim()
            .required()
            .min(3)
            .max(10),
        firstName: Joi.string()
            .trim()
            .required()
            .min(1),
        lastName: Joi.string()
            .trim()
            .required()
            .min(1)
    })
}