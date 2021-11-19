const router = require('express').Router();

// const { userMiddleware } = require('../../middleware');

const { authController } = require('../controllers');

router.post(
    '/login',
    authController.userLogin
);

router.post(
    '/logout'
);

router.post(
    '/refresh'
);

module.exports = router;
