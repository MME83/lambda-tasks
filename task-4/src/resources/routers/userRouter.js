const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../../middleware');
const { userController } = require('../controllers');

router.get(
    '/',
    authMiddleware.checkAccessToken,
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
    authMiddleware.checkAccessToken,
    userController.getUserById
);

module.exports = router;
