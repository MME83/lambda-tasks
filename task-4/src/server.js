const { MongoClient } = require('mongodb');

const app = require('./app');

const { PORT, DB_URI } = require('./common/config');

const start = async () => {
    const client = new MongoClient(`${DB_URI}`);

    try {
        // Connect to the MongoDB cluster
        const connected = await client.connect();

        if (connected) {
            process.stdout.write('Cluster - MongoDB connected!\n\n');
        }

        app.listen(PORT, () => {
            process.stdout.write(`app is running on http://localhost:${PORT}/\n\n`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

start().catch((err) => {
    console.error(err);
});
