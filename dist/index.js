"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tdlib_1 = require("./tdlib");
const express = require("express");
const winston = require("winston");
const bodyParser = require('body-parser');
winston.configure({
    transports: [
        new winston.transports.Console({ level: process.env.NODE_ENV == "production" ? "info" : "debug" })
    ]
});
const app = express();
const PORT = parseInt(process.env.PORT || "8080", 10);
function forceSSL(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        let secure_url = ['https://', req.get('Host'), req.url].join('');
        winston.debug("Got insecure request, redirecting to " + secure_url);
        return res.redirect(secure_url);
    }
    return next();
}
// Force SSL
if (process.env.NODE_ENV != "production") {
    winston.debug("Not forcing SSL");
}
else {
    winston.debug("Forcing SSL redirects");
    app.use(forceSSL);
}
function onServerListening() {
    winston.info("Server listening on " + PORT);
}
app.set('port', PORT);
app.use(bodyParser.json());
process.env.NODE_ENV == "production" ? app.listen(PORT, onServerListening) : app.listen(PORT, "localhost", onServerListening);
tdlib_1.Tdlib.authorize();
