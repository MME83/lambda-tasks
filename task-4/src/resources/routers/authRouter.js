const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../../middleware');

const { authController } = require('../controllers');

router.post(
    '/login',
    userMiddleware.isReqBodyValid,
    userMiddleware.isLoginExist,
    authController.userLogin
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken
);

router.post(
    '/logout'
);

module.exports = router;
