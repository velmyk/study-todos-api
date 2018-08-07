const express = require('express');
const { version } = require('../../package.json');
const routerConstructor = express.Router;
const router = routerConstructor();

module.exports = router
    .get('', (req, res) => res.send(`learn front-end api ${version}`))
    .use('/todos', require('./todos'));
