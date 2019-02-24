import * as express from 'express';
import * as voluble from 'voluble-common';
import * as winston from 'winston';
import { TdLibClient } from './tdLibClient';
const { Client } = require('tglib')

var dotenv = require('dotenv').config()
const bodyParser = require('body-parser');

winston.configure({
    transports: [
        new winston.transports.Console({ level: "debug" })
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
    tdSetup()
    //useTg()
}

app.set('port', PORT);
app.use(bodyParser.json());
process.env.NODE_ENV == "production" ? app.listen(PORT, onServerListening) : app.listen(PORT, "localhost", onServerListening)

function tdSetup() {

    let Tdlib = new TdLibClient()
    winston.info("setting params")
    Tdlib.sendQuery({
        '@type': "setTdlibParameters",
        "parameters": {
            "use_test_dc": process.env.NODE_ENV == "production" ? true : false,
            "database_directory": "", // cwd
            "files_directory": "", //cwd
            "use_file_database": true,
            "use_chat_info_database": true,
            "use_message_database": true,
            "use_secret_chats": false,
            "api_id": process.env.TELEGRAM_API_ID,
            "api_hash": process.env.TELEGRAM_API_HASH,
            "system_language_code": "en-gb",
            "device_model": "Asus Zenbook",
            "system_version": "Win10",
            "application_version": "1.0.0",
            "enable_storage_optimizer": true,
            "ignore_file_names": false
        }
    })
        .catch((err) => {
            winston.error(`Got error: ${err}`)
        })
        .then(function (resp) {
            //await asyncTimeout(1000)
            if (resp) {
                winston.info("Returned from setting params:")
                winston.info(resp)
            } else {
                winston.info("Got nothing from param setting")
            }
            return
        })
        .then(() => {
            winston.info("checkDatabaseEncrpytionKey")
            return Tdlib.sendQuery({
                '@type': "checkDatabaseEncryptionKey",
                "encryption_key": ""
            })
        })
        .then(function (resp) {
            if (resp) {
                winston.info("response to checkDatabaseEncryptionKey:")
                winston.info(resp)
            }
            return
        })
        .then(() => {
            winston.info("Importing contacts")
            return Tdlib.sendQuery({
                '@type': 'importContacts', 'contacts': [
                    {
                        phone_number: "+447426437449",
                        first_name: "Cal",
                        last_name: "McLean"
                    }
                ]
            })
        })
        .then(function (resp) {
            if (resp) {
                winston.info("response to addContact:")
                winston.info(resp)
            }
            return
        })
}



