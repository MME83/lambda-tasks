const router = require('express').Router();

const { authController } = require('../controllers');

router.post(
    '/signup',
    authController.signUpUser
);

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
