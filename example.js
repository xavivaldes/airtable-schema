const airtableschema = require('./index');

//Change this value for the value of your cookie __Host-airtable-session
const HOST_AIRTABLE_SESSION_COOKIE_VALUE = "sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP";
//Change this value for the value of your cookie __Host-airtable-session.sig
const HOST_AIRTABLE_SESSION_SIG_COOKIE_VALUE = "KJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ";
//Change this value for your Base Id
const BASE_ID = "appASDFSADFASDF";
//Change this value for your Table Id
const TABLE_ID = "tblASDFSADFASDF";
//Change this value for your Column Id
const COLUMN_ID = "fldASDFSADFASDF";

airtableschema.configureSession({
    airtableSession: HOST_AIRTABLE_SESSION_COOKIE_VALUE,
    airtableSessionSig: HOST_AIRTABLE_SESSION_SIG_COOKIE_VALUE
});

airtableschema.getBaseSchema({
    baseId: BASE_ID
}).then(res => console.log(JSON.stringify(res, null, 2)));

airtableschema.getTableSchema({
    baseId: BASE_ID,
    tableId: TABLE_ID
}).then(res => console.log(JSON.stringify(res, null, 2)));

airtableschema.getColumnSchema({
    baseId: BASE_ID,
    tableId: TABLE_ID,
    columnId: COLUMN_ID
}).then(res => console.log(JSON.stringify(res, null, 2)));
