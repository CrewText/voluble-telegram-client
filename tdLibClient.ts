import * as ffi from 'ffi-napi'
var winston = require('winston');
import * as crypto from 'crypto'
import { TdQuery, TdUpdate, TdUpdateAuthorizationState, ITdObject, TdError, TdOk } from './tdApi'

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
    private inFlightRequests: { resolve: Function, reject: Function }[] = []

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

    private async _send(query: TdQuery) {
        return new Promise((resolve, reject) => {
            this.tdlib.td_json_client_send.async(this.client, this.buildQuery(query), (err: Error, res: any) => {
                if (err) { reject(err) }
                else {
                    resolve(res ? res : null)
                }
            })
        })
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
                    winston.info("Got error, should this be coerced in future?")
                    reject(err)
                }
                else if (!res) {
                    resolve(null)
                } else {
                    let ret = JSON.parse(res)
                    if (ret["@type"] == "error") {
                        reject(<TdError>ret)
                    } else {
                        resolve(<TdUpdate>res)
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
        await this._send(query)
        return new Promise((resolve, reject) => {
            this.inFlightRequests[query_id] = { resolve, reject }
        })
    }

    private handleUpdateAuthorizationState(authState: TdUpdateAuthorizationState) {
        winston.debug(`Auth state: ${authState.authorization_state["@type"]}`)
        if (authState.authorization_state["@type"] == "authorizationStateWaitCode") {

        } else if (authState.authorization_state["@type"] == "authorizationStateWaitEncryptionKey") {

        } else if (authState.authorization_state["@type"] == "authorizationStateWaitPassword") {

        } else if (authState.authorization_state["@type"] == "authorizationStateWaitPhoneNumber") {

        } else if (authState.authorization_state["@type"] == "authorizationStateWaitTdlibParameters") {

        } else if (authState.authorization_state["@type"] == "authorizationStateReady") {
            winston.debug(`Auth state: ${authState.authorization_state["@type"]}`)
        }
    }

    async doReceiveLoop() {
        winston.info("Doing receive loop")
        await this._receive()
            .then((update) => {
                if (!update) { return }
                else if (update["@extra"]) {
                    // This is a response to a request we've sent manually, there's a promise
                    // waiting for it
                    winston.debug(`Not directly handling response to query ${update["@extra"]}`)
                    this.inFlightRequests[update['@extra']].resolve(update)
                    delete this.inFlightRequests[update["@extra"]]
                    return
                } else {
                    // This is an update from Telegram, deal with it
                    winston.info("Got unsolicited update")
                    winston.info(update)

                    if (update["@type"] == "updateAuthorizationState") {
                        this.handleUpdateAuthorizationState(<TdUpdateAuthorizationState>update)
                    }
                    return
                }
            })
            .catch((err: TdError) => {
                if (err["@extra"]) {
                    // This error is a response to a manual request, pass it on
                    this.inFlightRequests[err["@extra"]].reject(err)
                    delete this.inFlightRequests[err["@extra"]]
                }
                return
            })
        this.doReceiveLoop()
    }
}