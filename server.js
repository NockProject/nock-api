'use strict';

const server = require('express')();
const localConfig = require('./config/local.json');


server.get('/', function (req, res) {
    res.send("passe");
});

server.listen(localConfig.SERVER_PORT);