const HttpStatusCode = require('../../common/statusCodes');

const asyncWrapper = require('../../middleware/asyncWrapper');

const { userService } = require('../services');

module.exports = {
    getCalc: asyncWrapper(async (req, res) => {
        const { language, mimetype, count } = req.body;

        const calc = await userService.getCalculation(language, mimetype, count);

        if (!calc) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'we can\'t calculate your order, please call to us' });
        }

        return res.json(calc);
    })
};
