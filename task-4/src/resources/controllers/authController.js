const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

const { authService } = require('../services');

module.exports = {
    userLogin: asyncWrapper(async (req, res) => {
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        return res.status(HttpStatusCode.OK).json('Success!');
    }),
};
