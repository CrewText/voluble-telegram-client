import * as ffi from 'ffi-napi';
import * as readline from 'readline';
//import * as tdapi from './tdApi';
//import * as tdapi from './tdapi2'
import { EventEmitter } from 'events';
import { isNullOrUndefined } from 'util';
var winston = require('winston');

// tdlib JSON documentation here: https://core.telegram.org/tdlib/docs/td__json__client_8h.html
// tdlib API documentation here: https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_function.html

async function asyncTimeout(timeout = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, 500)
    })
}

export interface TdObject {
    '@type': string
    '@extra'?: number
    [key: string]: any
}

export class TdError extends Error {
    code: number;
    tdError: TdObject
    constructor(err: TdObject) {
        super(err.message)
        this.name = "TdError"
        this.code = err.code
        this.tdError = err
    }
}

export class TimeoutError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "TimeoutError"
    }
}

export class TdLibClient extends EventEmitter {
    PATH_TO_LIBRARY_FILE = process.env.TDLIB_PATH
    tdlib: any
    private client: any
    private inFlightRequests: { resolve: (resp: TdObject) => void, reject: (err: any) => void }[] = []
    private isActive: boolean = false
    //events = new EventEmitter()

    constructor() {
        super()
        this.tdlib = ffi.Library(
            this.PATH_TO_LIBRARY_FILE || "",
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
        this.isActive = true
        this.doReceiveLoop()
    }

    private buildQuery(query: TdObject) {
        const buffer = Buffer.from(JSON.stringify(query) + '\0', 'utf-8')
        //buffer.type = ref.types.CString
        return buffer
    }

    private _send(query: TdObject) {
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

    private async _execute(query: TdObject) {
        return new Promise((resolve, reject) => {
            this.tdlib.td_json_client_execute.async(this.client, this.buildQuery(query), (err: Error, res: any) => {
                if (err) { reject(err) }
                else {
                    resolve(res ? JSON.parse(res) : null)
                }
            })
        })
    }

    private async _receive(timeout = 2): Promise<TdObject | null> {
        return new Promise((resolve, reject) => {
            this.tdlib.td_json_client_receive.async(this.client, timeout, (err: Error, res: any) => {
                if (err) {
                    console.info("Got error, should this be coerced in future?")
                    reject(err)
                }
                else if (!res) {
                    resolve()
                } else {
                    let res_parsed = JSON.parse(res)
                    if (!res_parsed["@type"]) {
                        reject(new Error("Could not parse JSON response into TD Object"))
                    }
                    if (res_parsed["@type"] == "error") {
                        console.info("Got TD-Style error, rejecting")
                        reject(new TdError(<TdObject>res_parsed))
                    } else {
                        resolve(<TdObject>res_parsed)
                    }
                }
            })
        })
    }

    destroy() {
        this.isActive = false
        this.tdlib.td_json_client_destroy(this.client)
    }

    async sendQuery(query: TdObject) {
        let query_id = Math.floor(Math.random() * (2 ** 32) - 1)
        query["@extra"] = query_id
        console.info("Sending req " + query_id + ": " + query["@type"])
        try {
            return this._send(query)
                .then(() => {
                    return new Promise<TdObject>((resolve, reject) => {
                        this.inFlightRequests[query_id] = { resolve, reject }
                        setTimeout(() => {
                            reject(new TimeoutError(`Call ${query_id} (${query["@type"]}) timed out`))
                        }, 30000)
                    })
                })
        } catch (err) {
            console.error("couldn't use sendQuery for " + query["@type"])
        }
    }

    private async handleUpdateAuthorizationState(authState: TdObject) {
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
                            // res(this.sendQuery(<TdQueryGetChats>{
                            //     "code": answer,
                            //     "first_name": "Cal",
                            //     "last_name": "McLean"
                            // }))
                            // this.sendQuery(<TdQueryGetChats>{ offset_chat_id: 0 })
                        })
                    })

                case "authorizationStateWaitEncryptionKey":
                    console.debug("Sending checkDatabaseEncryptionKey with default key")
                    let qCheckDatabaseEncrKey: TdObject = {
                        '@type': "checkDatabaseEncryptionKey",
                        'encryption_key': ""
                    }
                    return await this.sendQuery(qCheckDatabaseEncrKey)

                case "authorizationStateWaitPassword":
                    break

                case "authorizationStateWaitPhoneNumber":
                    console.debug("Sending setAuthenticationPhoneNumber")
                    console.debug("Using number: " + process.env.TELEGRAM_PHONE_NUMBER)
                    let qSetAuthPhoneNum: TdObject = {
                        '@type': 'setAuthenticationPhoneNumber',
                        'phone_number': process.env.TELEGRAM_PHONE_NUMBER ? process.env.TELEGRAM_PHONE_NUMBER : "",
                        'allow_flash_call': false,
                        'is_current_phone_number': true
                    }
                    return await this.sendQuery(qSetAuthPhoneNum)

                case "authorizationStateWaitTdlibParameters":

                    let tdLibParams: TdObject = {
                        '@type': 'setTdLibParameters',
                        use_test_dc: process.env.NODE_ENV == "production" ? false : true,
                        database_directory: "",
                        files_directory: "",
                        use_file_database: true,
                        use_chat_info_database: true,
                        use_message_database: true,
                        use_secret_chats: false,
                        api_id: process.env.TELEGRAM_API_ID ? +process.env.TELEGRAM_API_ID : 0,
                        api_hash: process.env.TELEGRAM_API_HASH ? process.env.TELEGRAM_API_HASH : "",
                        system_language_code: "en-gb",
                        device_model: process.env.NODE_ENV == "production" ? process.platform : "Asus Zenbook",
                        system_version: process.env.NODE_ENV == "production" ? process.config.variables.host_arch : "Win10",
                        application_version: "1.0.0",
                        enable_storage_optimizer: true,
                        ignore_file_names: false
                    }
                    console.log(tdLibParams)
                    return await this.sendQuery(tdLibParams)

                case "authorizationStateReady":
                    console.debug("Authorized and ready")
                    //this.events.emit('ready')
                    this.emit('ready')
                    break

            }
        } catch (err) {
            console.info("Got err from AuthStateHandler")
            console.error(err)
            return this.sendQuery({
                '@type': 'getAuthorizationState'
            })
        }
    }

    private async doReceiveLoop() {
        while (this.isActive) {
            let update: TdObject | null;

            update = await this._receive()
            try {

            } catch (err) {
                console.error(`Caught error ${err.code}: ${err.message}, diagnosing`)
                if (err["@extra"]) {
                    // This error is a response to a manual request, pass it on
                    this.inFlightRequests[err["@extra"]].reject(new TdError(<TdObject>err))
                    delete this.inFlightRequests[err["@extra"]]
                } else {
                    console.error(`Caught error ${err.code}: ${err.message}`)
                    console.error(err)
                }
            }

            if (update) {
                switch (update["@type"]) {
                    case "updateAuthorizationState":
                        this.handleUpdateAuthorizationState(<TdObject>update)
                            .then((thing) => {
                                // if (thing instanceof) {

                                // }
                            })
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


                if (update['@extra']) {
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
                            let update_option = <TdObject>update
                            if (update_option.value)

                                console.debug(`Got Option: '${update_option.name}': ${update_option.value ? update_option.value.value : null}`)
                    }

                    // console.info("Got unsolicited update")
                    // console.info(update)
                }
            }

            this.doReceiveLoop()
        }

    }
}