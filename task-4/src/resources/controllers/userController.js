const { UserModel } = require('../models');

const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

const { userService } = require('../services');

module.exports = {
    getAllUsers: asyncWrapper(async (req, res) => {
        const users = await userService.getAll();

        if (!users) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send({ message: 'No users found' });
        }

        return res.status(HttpStatusCode.OK).json(users.map(UserModel.toResponse));
    }),

    createUser: asyncWrapper(async (req, res) => {
        const user = await userService.createUser(req.body);

        if (!user) {
            return res.status(HttpStatusCode.CONFLICT).send({ message: 'Can\'t create new User, pls try again' });
        }

        return res.status(HttpStatusCode.CREATED).json(UserModel.toResponse(user));
    }),

    getUserById: asyncWrapper(async (req, res) => {
        const { user_id } = req.params;

        const user = await userService.getUserById(user_id);

        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'User not found' });
        }

        return res.json(UserModel.toResponse(user));
    }),

    getUserByReqNum: (req, res) => {
        const { req_num } = req.params;

        const { userLogged } = req;

        return res.json({
            reques_num: req_num,
            data: {
                username: userLogged.email
            }
        });
    }
};
