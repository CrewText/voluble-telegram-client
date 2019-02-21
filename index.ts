const ffi = require('ffi-napi')
const ref = require('ref-napi')

function buildQuery(query: any) {
    const buffer = Buffer.from(JSON.stringify(query) + '\0', 'utf-8')
    //buffer.type = ref.types.CString
    return buffer
}

const PATH_TO_LIBRARY_FILE = 'libtdjson'
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

function send(query: any) {
    tdlib.td_json_client_send(client, buildQuery(query))
}

function execute(query: any) {
    return JSON.parse(
        tdlib.td_json_client_execute(client, buildQuery(query))
    )
}

function receive() {
    const timeout = 2
    return JSON.parse(
        tdlib.td_json_client_receive(client, timeout)
    )
}

function destroy() {
    tdlib.td_json_client_destroy(client)
}