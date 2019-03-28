import * as express from 'express';
import * as winston from 'winston';
import { TdLibClient } from './tdLibClient';

const routes_index = require('./routes/index')

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
    let tdClient = new TdLibClient()

    process.on('exit', () => {
        if (tdClient) {
            tdClient.destroy()
        }
    })

}

app.set('port', PORT);
app.use(bodyParser.json());
app.use('/', routes_index)
process.env.NODE_ENV == "production" ? app.listen(PORT, onServerListening) : app.listen(PORT, "localhost", onServerListening)



