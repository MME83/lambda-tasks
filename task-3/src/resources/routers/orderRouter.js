const router = require('express').Router();

const { orderController } = require('../controllers');

router.get('/', orderController.getOrder);

module.exports = router;
