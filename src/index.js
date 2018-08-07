/* eslint-disable no-console */
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '/../.env') });
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const buildMongoUrl = require('./services/buildMongoUrl');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');

const mongoDbUrl = buildMongoUrl();
mongoose.connect(mongoDbUrl);
mongoose.connection
    .on('connected', () => console.log(`Mongoose connection opened`))
    .on('disconnected', () => {
        console.log('Mongoose connection disconnected');
        process.exit(1);
    })
    .on('error', err => {
        console.log(`Mongoose connection error  ${err}`);
        process.exit(1);
    });
process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)));

const app = express();

app
    .unsubscribe(cors())
    .use(bodyParser.json({ limit: '50mb' }))
    .use(morgan('tiny'))
    .use(helmet())
    .use('/api/v1/', routes)
    .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
