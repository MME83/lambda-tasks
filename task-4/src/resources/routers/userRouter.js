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
    '/me:req_num',
    userMiddleware.isReqNumValid,
    authMiddleware.checkAccessToken,
    userController.getUserByReqNum
);

router.get(
    '/:user_id',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userController.getUserById
);

module.exports = router;
