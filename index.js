const fetch = require("node-fetch");

let _airtableSession = process.env.AIRTABLE_SESSION;
let _airtableSessionSig = process.env.AIRTABLE_SESSION_SIG;

exports.configureSession = function ({airtableSession, airtableSessionSig}) {
    _airtableSession = airtableSession;
    _airtableSessionSig = airtableSessionSig;
};

exports.getBaseSchema = async function ({baseId, airtableSession = _airtableSession, airtableSessionSig = _airtableSessionSig}) {
    if (!airtableSession || !airtableSessionSig) throw "Configure Airtable session first.";
    return fetch(`https://airtable.com/v0.3/application/${baseId}/read`, {
        "headers": {
            "accept": "*/*",
            "x-airtable-application-id": baseId,
            "x-requested-with": "XMLHttpRequest",
            "x-time-zone": "Europe/Berlin",
            "x-user-locale": "us",
            "Cookie": `__Host-airtable-session=${airtableSession}; __Host-airtable-session.sig=${airtableSessionSig};`
        }
    })
        .then(res => res.json())
        .then(json => {
            if (json.error) throw JSON.stringify(json.error);
            return json;
        });
};

exports.getTableSchema = async function ({baseId, tableId, airtableSession = _airtableSession, airtableSessionSig = _airtableSessionSig}) {
    return exports.getBaseSchema({baseId: baseId})
        .then(schema => schema
            .data
            .tableSchemas
            .filter(t => t.id === tableId)[0]
        );
};

exports.getColumnSchema = async function ({baseId, tableId, columnId, airtableSession = _airtableSession, airtableSessionSig = _airtableSessionSig}) {
    return exports.getTableSchema({baseId: baseId, tableId: tableId})
        .then(schema => schema
            .columns
            .filter(c => c.id === columnId)[0]
        );
};