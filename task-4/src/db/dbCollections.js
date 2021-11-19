const connectToDB = require('./dbConnection');
const { USERS } = require('./dbFieldsEnum');

module.exports = {
    collectionUsers: async () => {
        const db = await connectToDB();

        const collection = db.collection(USERS);

        collection.createIndex({ email: 1 }, { unique: true });

        return collection;
    },
};
