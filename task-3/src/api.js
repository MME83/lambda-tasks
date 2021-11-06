const express = require('express');

const { orderRouter } = require('./resources/routers');

const handleErrors = require('./middleware/globalHandleErrors');

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }

    next();
});

api.use('/orders', orderRouter);
api.use(handleErrors);

module.exports = api;