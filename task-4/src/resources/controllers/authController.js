const { UserModel } = require('../models');

const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

const { authService, jwtService } = require('../services');
const constants = require('../../common/constants');

module.exports = {
    userLogin: asyncWrapper(async (req, res) => {
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        const tokenPair = jwtService.genereateTokenPair();

        await jwtService.createTokensInBd(tokenPair, user._id);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: UserModel.toResponse(user),
        });
    }),

    refreshToken: asyncWrapper(async (req, res) => {
        const sessionToken = req.get(constants.AUTHORIZATION);
        const token = sessionToken.split(' ')[1];

        const { userLogged } = req;

        await jwtService.refreshToken(token);

        const tokenPair = jwtService.genereateTokenPair();

        await jwtService.createTokensInBd(tokenPair, userLogged);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user_id: userLogged,
        });
    }),
};
