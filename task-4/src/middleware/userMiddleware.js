const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { userService } = require('../resources/services');
const { userValidator } = require('../util');

module.exports = {
    isReqBodyValid: asyncWrapper(async (req, res, next) => {
        try {
            const value = await userValidator.userBodyValidator.validateAsync(req.body);

            req.body = value;

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    }),

    isEmailExists: asyncWrapper(async (req, res, next) => {
        const { email } = req.body;

        const user = await userService.getUserByEmail({ email });

        if (user) throw new CustomError(HttpStatusCode.CONFLICT, `The email: ${email} is already exists`);

        next();
    }),

    isLoginExist: asyncWrapper(async (req, res, next) => {
        const { email } = req.body;

        const user = await userService.getUserByEmail({ email });

        if (!user) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Login is no valide');

        req.user = user;

        next();
    }),

    isReqNumValid: asyncWrapper(async (req, res, next) => {
        try {
            await userValidator.reqNumValidator.validateAsync(req.params);

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    }),

    isUserIdValid: asyncWrapper(async (req, res, next) => {
        try {
            await userValidator.getUserByIdValidator.validateAsync(req.params);

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    }),
};
