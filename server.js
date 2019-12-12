'use strict';

const server = require('express')();
const localConfig = require('./config/local.json');


server.get('/', function (req, res) {
    console.log("Serveur lancer sur : Localhost:3000");
    res.send("passe");
});

server.listen(localConfig.SERVER_PORT);