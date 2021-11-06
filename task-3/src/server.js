const api = require('./api');

const {
    PORT
} = require('./common/config');

const start = async () => {
    api.listen(PORT, () => {
        process.stdout.write(`Api is running on http://localhost:${PORT}\n\n`);
    });
};

start().catch((err) => {
    console.error(err);
});
