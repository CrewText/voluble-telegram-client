import * as express from 'express';
import * as voluble from 'voluble-common';
import * as winston from 'winston';
import { Tdlib } from './tdlib';
var dotenv = require('dotenv').config()
const bodyParser = require('body-parser');

winston.configure({
    transports: [
        new winston.transports.Console({ level: process.env.NODE_ENV == "production" ? "info" : "debug" })
    ]
})

const app = express()
const PORT = parseInt(process.env.PORT || "8080", 10)

function forceSSL(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        let secure_url = ['https://', req.get('Host'), req.url].join('')
        winston.debug("Got insecure request, redirecting to " + secure_url)
        return res.redirect(secure_url);
    }
    return next();
}

// Force SSL
if (process.env.NODE_ENV != "production") {
    winston.debug("Not forcing SSL")
} else {
    winston.debug("Forcing SSL redirects")
    app.use(forceSSL)
}

function onServerListening() {
    winston.info("Server listening on " + PORT)
}

app.set('port', PORT);
app.use(bodyParser.json());
process.env.NODE_ENV == "production" ? app.listen(PORT, onServerListening) : app.listen(PORT, "localhost", onServerListening)

Tdlib.authorize()

Tdlib.send({
    '@type': "setTdlibParameters",
    "parameters": {
        "use_test_dc_": process.env.NODE_ENV == "production" ? true : false,
        "database_directory_": "", // cwd
        "files_directory_": "", //cwd
        "use_file_database_": true,
        "use_chat_info_database_": true,
        "use_message_database_": true,
        "use_secret_chats_": false,
        "api_id_": process.env.TELEGRAM_API_ID,
        "api_hash_": process.env.TELEGRAM_API_HASH,
        "system_language_code_": "en-gb",
        "device_model_": "Asus Zenbook",
        "system_version_": "Win10",
        "application_version_": "1.0.0",
        "enable_storage_optimizer_": true,
        "ignore_file_names_": false
    }
})
winston.log(Tdlib.receive(10))

function send_message(message: voluble.Message) {
    Tdlib.send({
        '@type': "sendMessage", "parameters": {
            "chat_id_": ""
        }
    })
}