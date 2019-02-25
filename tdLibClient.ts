import * as ffi from 'ffi-napi';
import * as readline from 'readline';
import { TdError, TdOk, TdQuery, TdUpdate, TdUpdateAuthorizationState, TdUpdateOption } from './tdApi';
import { EventEmitter } from 'events';
var winston = require('winston');

// tdlib JSON documentation here: https://core.telegram.org/tdlib/docs/td__json__client_8h.html
// tdlib API documentation here: https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_function.html

async function asyncTimeout(timeout = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, 500)
    })
}

export class TdLibClient {
    PATH_TO_LIBRARY_FILE: string = '/var/libtdjson.so'
    tdlib: any
    private client: any
    private inFlightRequests: { resolve: (resp: TdUpdate | TdOk) => void, reject: (err: any) => void }[] = []
    events = new EventEmitter()

    constructor() {
        this.tdlib = ffi.Library(
            this.PATH_TO_LIBRARY_FILE,
            {
                'td_json_client_create': ['pointer', []],
                'td_json_client_send': ['void', ['pointer', 'string']],
                'td_json_client_receive': ['string', ['pointer', 'double']],
                'td_json_client_execute': ['string', ['pointer', 'string']],
                'td_json_client_destroy': ['void', ['pointer']],
                'td_set_log_file_path': ['int', ['string']],
                'td_set_log_verbosity_level': ['void', ['int']],
                'td_set_log_fatal_error_callback': ['void', ['pointer']]
            }

        )

        // Create client
        this.client = this.tdlib.td_json_client_create()
        this.tdlib.td_set_log_file_path('/var/calmc/Source/Repos/voluble-telegram-client/logs.txt')
        this.tdlib.td_set_log_verbosity_level(4)
        this.init()
    }

    private async init() {
        await asyncTimeout(1000)
        this.doReceiveLoop()
    }

    private buildQuery(query: TdQuery) {
        const buffer = Buffer.from(JSON.stringify(query) + '\0', 'utf-8')
        //buffer.type = ref.types.CString
        return buffer
    }

    private _send(query: TdQuery) {
        try {
            return new Promise((resolve, reject) => {
                this.tdlib.td_json_client_send.async(this.client, this.buildQuery(query), (err: Error, res: any) => {
                    if (err) {
                        console.error(`Couldn't send query ${query["@type"]}`)
                        reject(err)
                    }
                    else {
                        resolve(res ? res : null)
                    }
                })
            })
                .catch((err) => { console.error("i love errors") })
        } catch{
            throw new Error("oh noes")
        }
    }

    private async _execute(query: TdQuery) {
        return new Promise((resolve, reject) => {
            this.tdlib.td_json_client_execute.async(this.client, this.buildQuery(query), (err: Error, res: any) => {
                if (err) { reject(err) }
                else {
                    resolve(res ? JSON.parse(res) : null)
                }
            })
        })
    }

    private async _receive(timeout = 2): Promise<TdUpdate | TdOk | null> {
        return new Promise((resolve, reject) => {
            this.tdlib.td_json_client_receive.async(this.client, timeout, (err: Error, res: any) => {
                if (err) {
                    console.info("Got error, should this be coerced in future?")
                    reject(err)
                }
                else if (!res) {
                    resolve(null)
                } else {
                    let res_parsed = JSON.parse(res)
                    if (res_parsed["@type"] == "error") {
                        reject(<TdError>res_parsed)
                    } else {
                        resolve(<TdUpdate>res_parsed)
                    }
                }
            })
        })
    }

    destroy() {
        this.tdlib.td_json_client_destroy(this.client)
    }

    async sendQuery(query: TdQuery) {
        let query_id = Math.floor(Math.random() * (2 ** 32) - 1)
        query["@extra"] = query_id
        console.info("Sending req " + query_id + ": " + query["@type"])
        try {
            return this._send(query)
                .then(() => {
                    return new Promise<TdUpdate | TdOk>((resolve, reject) => {
                        this.inFlightRequests[query_id] = { resolve, reject }
                        setTimeout(() => {
                            // Make this a proper Error!
                            reject(<TdError>{ "code": 999, "message": "Timed Out" })
                        }, 30000)
                    })
                })
        } catch (err) {
            console.error("couldn't use sendQuery for " + query["@type"])
        }
    }

    private async handleUpdateAuthorizationState(authState: TdUpdateAuthorizationState) {
        console.debug(`Received authorization_state: ${authState.authorization_state["@type"]}`)
        try {
            switch (authState.authorization_state["@type"]) {
                case "authorizationStateWaitCode":
                    return await new Promise((res, rej) => {
                        const rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });
                        rl.question('Update code?', (answer) => {
                            res(this._send({
                                '@type': "checkAuthenticationCode",
                                "code": answer,
                                "first_name": "Cal",
                                "last_name": "McLean"
                            }))
                        })
                    })

                case "authorizationStateWaitEncryptionKey":
                    console.debug("Sending checkDatabaseEncryptionKey with default key")
                    return await this._send({ "@type": "checkDatabaseEncryptionKey", "encryption_key": "" })

                case "authorizationStateWaitPassword":
                    break

                case "authorizationStateWaitPhoneNumber":
                    console.debug("Sending setAuthenticationPhoneNumber")
                    console.debug("Using number: " + process.env.TELEGRAM_PHONE_NUMBER)
                    return await this._send({
                        "@type": "setAuthenticationPhoneNumber",
                        "phone_number": process.env.TELEGRAM_PHONE_NUMBER,
                        "allow_flash_call": false,
                        "is_current_phone_number": true //even though this is ignore
                        // "@type": "checkAuthenticationBotToken",
                        // "token": process.env.TELEGRAM_BOT_TOKEN
                    })

                case "authorizationStateWaitTdlibParameters":
                    return await this._send({
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

                case "authorizationStateReady":
                    console.debug("Authorized and ready")
                    this.events.emit('ready')
                    break

            }
        } catch (err) {
            console.info("Got err from AuthStateHandler")
            console.error(err)
            return await this._send({
                '@type': 'getAuthorizationState'
            })
        }
    }

    private async doReceiveLoop() {
        let update;

        try {
            update = await this._receive()
        } catch (err) {
            console.error(`Caught error ${err.code}: ${err.message}, diagnosing`)
            if (err["@extra"]) {
                // This error is a response to a manual request, pass it on
                this.inFlightRequests[err["@extra"]].reject(<TdError>err)
                delete this.inFlightRequests[err["@extra"]]
            } else {
                console.error(`Caught error ${err.code}: ${err.message}`)
                console.error(err)
            }
        }

        if (update) {
            switch (update["@type"]) {
                case "updateAuthorizationState":
                    this.handleUpdateAuthorizationState(<TdUpdateAuthorizationState>update)
                        .catch((err) => {
                            console.log("got err caught")
                            console.error(err)
                            throw err
                        })
                    break
                case "updateOption":
                    break
                default:
                    break
            }



            if (update["@extra"]) {
                /* This is a response to a request that was sent manually via
                 * sendQuery; there's a promise waiting for it, so just hand it over */
                //console.debug(`Not directly handling response to query ${update["@extra"]}`)
                console.debug(`Resolving request ${update["@extra"]} (${update["@type"]})`)
                this.inFlightRequests[update['@extra']].resolve(update)
                delete this.inFlightRequests[update["@extra"]]
            } else {
                /* This is an unsolicited update; Telegram is notifying us of something.
                 * Follow it up. */

                switch (update["@type"]) {
                    case "updateOption":
                        update = <TdUpdateOption>update
                        console.debug(`Got Option: '${update.name}': ${update.value.value}`)
                }

                // console.info("Got unsolicited update")
                // console.info(update)
            }
        }

        this.doReceiveLoop()

    }
}