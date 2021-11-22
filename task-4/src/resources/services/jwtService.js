const jwt = require('jsonwebtoken');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const { SECRET_ACCESS, SECRET_REFRESH } = require('../../common/config');

const { getRandomInt } = require('../../util');
const { MIN, MAX } = require('../../common/constants');

const { collectionOauth } = require('../../db/dbCollections');

module.exports = {
    genereateTokenPair: () => {
        const getExpTime = getRandomInt.getRandomInt(MIN, MAX);
        const access_token = jwt.sign({}, SECRET_ACCESS, { expiresIn: getExpTime });
        const refresh_token = jwt.sign({}, SECRET_REFRESH, { expiresIn: '31d' });

        return { access_token, refresh_token };
    },

    createTokensInBd: async (tokenPair, user_id) => {
        const collection = await collectionOauth();

        const createTokens = await collection.insertOne({ ...tokenPair, Users: user_id });

        if (!createTokens) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Can\'t create token pair, try again...');
        }

        process.stdout.write('\n ...new token pair created in DB \n\n');
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? SECRET_ACCESS : SECRET_REFRESH;

            jwt.verify(token, secret);
        } catch (err) {
            throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
        }
    },

    getTokenFromBD: async (token) => {
        const collection = await collectionOauth();

        const getToken = await collection.findOne(token);

        return getToken;
    },

    refreshToken: async (refresh_token, token) => {
        const collection = await collectionOauth();

        const tokenDeleted = await collection.deleteOne({ [refresh_token]: token });

        if (!tokenDeleted) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Token in DB not found');

        return true;
    },
};
