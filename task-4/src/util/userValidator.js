const Joi = require('joi');

const RegExp = require('../common/regexp.enum');

module.exports = {
    userBodyValidator: Joi.object({
        email: Joi
            .string().trim().regex(RegExp.EMAIL_REGEXP)
            .required(),
        password: Joi.string().trim().min(8).max(30)
            .regex(RegExp.PASS_REGEXP)
            .required(),
    }),

    getUserByIdValidator: Joi.object({
        user_id: Joi
            .string().trim().regex(RegExp.ID_REGEXP)
            .required()
    }),
};
