const mongodbUri = require('mongodb-uri');

const buildMongoUrl = () =>
    mongodbUri.formatMongoose({
        scheme: 'mongodb',
        hosts: [
            {
                host: process.env.MONGODB_HOST,
                port: process.env.MONGODB_PORT,
            },
        ],
        username: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        database: process.env.MONGODB_NAME,
    });

module.exports = buildMongoUrl;
