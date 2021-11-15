/**
 * function wrapper: route handler and middleware that return a Promise
 * @param {Function} fn: function
 * @returns next(error), will call next(value) automatically when is rejected or is thrown an error
 */

const asyncWrapper = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err);
});

module.exports = asyncWrapper;
