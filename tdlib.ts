import * as ffi from 'ffi-napi'
import winston = require('winston');

// tdlib JSON documentation here: https://core.telegram.org/tdlib/docs/td__json__client_8h.html
// tdlib API documentation here: https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_function.html


export namespace Tdlib {
    function buildQuery(query: any) {
        const buffer = Buffer.from(JSON.stringify(query) + '\0', 'utf-8')
        //buffer.type = ref.types.CString
        return buffer
    }

    const PATH_TO_LIBRARY_FILE = '/var/libtdjson.so'
    const tdlib = ffi.Library(
        PATH_TO_LIBRARY_FILE,
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
    const client = tdlib.td_json_client_create()

    export function send(query: any) {
        tdlib.td_json_client_send(client, buildQuery(query))
    }

    function execute(query: any) {
        return JSON.parse(
            tdlib.td_json_client_execute(client, buildQuery(query))
        )
    }

    export function receive(timeout = 2) {
        return JSON.parse(
            tdlib.td_json_client_receive(client, timeout)
        )
    }

    export function destroy() {
        tdlib.td_json_client_destroy(client)
    }

    export function authorize() {
        send({ '@type': 'getAuthorizationState' })
        let resp = receive(10)
        winston.log(resp)
    }
}