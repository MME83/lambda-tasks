const { ObjectId } = require('mongodb');

const { collectionUsers } = require('../../db/dbCollections');

const { hashPassword } = require('../../util');
// const { USERS } = require('./dbFieldsEnum');

// const constants = require('../../common/constants');

module.exports = {
    createUser: async (userData) => {
        const { email, password } = userData;

        const hashedPassword = await hashPassword(password);

        const collection = await collectionUsers();

        const user = await collection.insertOne({ email, password: hashedPassword });

        if (user) {
            process.stdout.write('\n ...new user created \n\n');
        }

        return { _id: user.insertedId, email, hashedPassword };
    },

    getAll: async () => {
        const collection = await collectionUsers();

        const users = await collection.find().toArray();

        return users;
    },

    getUserById: async (id) => {
        const collection = await collectionUsers();

        const user = await collection.findOne({ _id: new ObjectId(id) });

        return user;
    },

    getUserByEmail: async (email) => {
        const collection = await collectionUsers();

        const user = await collection.findOne(email);

        return user;
    }
};
