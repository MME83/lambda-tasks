const bcrypt = require('bcryptjs');
const { SALT } = require('../common/config');

const hashPassword = async (pass) => {
    const hashedPassword = await bcrypt.hash(pass, +SALT);

    return hashedPassword;
};

module.exports = hashPassword;
