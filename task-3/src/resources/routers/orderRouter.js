const router = require('express').Router();

const { orderController } = require('../controllers');

router.post('/', orderController.getCalc);

module.exports = router;
