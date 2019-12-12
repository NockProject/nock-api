'use strict';

const server = require('express')();
const localConfig = require('./config/local.json');


server.get('/', function (req, res) {
    res.send("passe");
});
console.log("Serveur lancer sur : Localhost:3000");
server.listen(localConfig.SERVER_PORT);