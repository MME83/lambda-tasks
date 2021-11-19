const bcrypt = require('bcryptjs');

const ErrorHandler = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const userLogin = async (password, bdPass) => {
    const passMatched = await bcrypt.compare(password, bdPass);

    if (!passMatched) throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Login or password wrong');

    return true;
};

module.exports = {
    userLogin,
};
