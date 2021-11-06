const { SERVER_ERROR } = require('../common/statusCodes');

const handleErrors = (err, _req, res, next) => {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            message: err.message || 'Internal Server Error'
        });
    
    next(err);
};

module.exports = handleErrors;
