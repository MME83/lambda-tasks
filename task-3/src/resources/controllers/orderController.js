const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

const { orderService } = require('../services');

module.exports = {
    getOrder: asyncWrapper(async (req, res) => {
        const { language, mimetype, count } = req.body;

        const calc = await orderService.getCalculation(language, mimetype, count);

        if (!calc) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'we can\'t calculate your order, please call to us' });
        };

        return res.json(calc);
    })
};
