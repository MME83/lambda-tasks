const router = require('express').Router();

const { userMiddleware } = require('../../middleware');

const { userController } = require('../controllers');

router.get(
    '/',
    userController.getAllUsers
);

router.post(
    '/signup',
    userMiddleware.isReqBodyValid,
    userMiddleware.isEmailExists,
    userController.createUser
);

router.get(
    '/:user_id',
    userController.getUserById
);

module.exports = router;
