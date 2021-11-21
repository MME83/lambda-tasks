const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,

    SALT: process.env.SALT,

    SECRET_ACCESS: process.env.SECRET_ACCESS,
    SECRET_REFRESH: process.env.SECRET_REFRESH,
};
