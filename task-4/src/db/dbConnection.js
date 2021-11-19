const { MongoClient } = require('mongodb');

const { DB_URI, DB_NAME } = require('../common/config');

const mongoClient = new MongoClient(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const connectToDB = async () => {
    try {
        await mongoClient.connect();

        const db = mongoClient.db(DB_NAME);

        if (db) {
            return db;
        }
    } catch (err) {
        return err;
    }
};

module.exports = connectToDB;
