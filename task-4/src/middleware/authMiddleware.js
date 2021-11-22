const constants = require('../common/constants');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const jwtService = require('../resources/services/jwtService');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const sessionToken = req.get(constants.AUTHORIZATION);

            if (!sessionToken) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'No token');
            }

            const token = sessionToken.split(' ')[1];

            jwtService.verifyToken(token);

            const tokenInDb = await jwtService.getTokenFromBD({ access_token: token });

            if (!tokenInDb) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
            }

            // use for check role middleware
            req.userLogged = tokenInDb.Users;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const sessionToken = req.get(constants.AUTHORIZATION);

            if (!sessionToken) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'No token');
            }

            const token = sessionToken.split(' ')[1];

            jwtService.verifyToken(token, 'refresh');

            const tokenInDb = await jwtService.getTokenFromBD({ refresh_token: token });

            if (!tokenInDb) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
            }

            // use for check role middleware
            req.userLogged = tokenInDb.Users;
        } catch (err) {
            next(err);
        }
    },
};
