const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.getCalc);

module.exports = router;
