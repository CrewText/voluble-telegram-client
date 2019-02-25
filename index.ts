import * as express from 'express';
import * as voluble from 'voluble-common';
import * as winston from 'winston';
import { TdLibClient } from './tdLibClient';
import { TdError } from './tdApi';


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
    Tdlib.events.once('ready', () => {

        Tdlib.sendQuery({
            '@type': "getChats",
            "offset_order": 2 ** 63 - 1,
            "offset_chat_id": 0
        })
            .catch((err: TdError) => {
                winston.error(`Couldn't get chats: ${err.code} (${err.message})`)
            })
            .then((resp) => {
                winston.info(resp ? resp : { msg: "No response for getting chats" })
            })
            .catch((err) => {
                winston.error(err)
            })
    })

    // .then(() => {
    //     winston.info("checkDatabaseEncrpytionKey")
    //     return Tdlib.sendQuery({
    //         '@type': "checkDatabaseEncryptionKey",
    //         "encryption_key": ""
    //     })
    // })
    // .then(function (resp) {
    //     if (resp) {
    //         winston.info("response to checkDatabaseEncryptionKey:")
    //         winston.info(resp)
    //     }
    //     return
    // })
    //.catch((err) => { })
    // .then(() => {
    //     winston.info("Importing contacts")
    //     return Tdlib.sendQuery({
    //         '@type': 'importContacts', 'contacts': [
    //             {
    //                 phone_number: "+447426437449",
    //                 first_name: "Cal",
    //                 last_name: "McLean"
    //             }
    //         ]
    //     })
    //         .catch((err: TdError) => {
    //             winston.error(`Couldn't import contact: ${err.code} (${err.message})`)
    //         })
    // })
    // .then(function (resp) {
    //     if (resp) {
    //         winston.info("response to addContact:")
    //         winston.info(resp)
    //     }
    //     return
    // })
}



