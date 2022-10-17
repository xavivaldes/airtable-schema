# airtable-schema
> :warning: **Official API available**: You can use now the official Airtable Metadata API. Documentation here: https://airtable.com/api/meta

Workaround to retrieve the Base schema from Airtable. Waiting for improvements on Metadata API.

## How it works
The functionality is really basic. It uses the Web Client API of Airtable to retrieve the schema. You can just perform this fetch:
```
fetch(`https://airtable.com/v0.3/application/${baseId}/read`, {
    "headers": {
        "accept": "*/*",
        "x-airtable-application-id": baseId,
        "x-requested-with": "XMLHttpRequest",
        "x-time-zone": "Europe/Berlin",
        "x-user-locale": "us",
        "Cookie": `__Host-airtable-session=${AIRTABLE_SESSION}; __Host-airtable-session.sig=${AIRTABLE_SESSION_SIG};`
    }
})
```
Using your Base Id and the specific Cookies than you can see on Chrome Development Tools -> Network (any readXXX call).

Or if you prefer you can use this library, that performs the fetch for you.

## Finding out the cookies
Before to use this library (or to perform the fetch manually), you need to find out two cookies. You can follow these steps:
1. Go to airtable http://airtable.com
2. Open Developer tools (F12)
3. Open Network tab in Developer tools
4. Now open your base, and some record of any table.
5. In Developer tools -> Network tab: Look for any `readXXX` call (like `readData` or `readForDetailView`), click on it
6. Inspect the cookies on Request Headers
7. Look for these Cookies, and save the values:
```
__Host-airtable-session=your_host_airtable_session_value
__Host-airtable-session.sig=your_host_airtable_session_SIG_value
```
## Installation
`npm install -s airtable-schema`

## Configuration
Now you can configure the library. There are three options to configure.

### Environment variables
You can set these two Environment Variables with the Cookie values
```
AIRTABLE_SESSION=your_host_airtable_session_value
AIRTABLE_SESSION_SIG=your_host_airtable_session_SIG_value
```

### Calling configureSession
You can call `configureSession` function
```
const airtableschema = require('airtable-schema');

airtableschema.configureSession({
    airtableSession: "your_host_airtable_session_value",
    airtableSessionSig: "your_host_airtable_session_SIG_value"
});
```

### Parameters in the methods
Or you can pass the two parameters each time you call a method.

## Usage
Using `configureSession`:
```
const airtableschema = require('airtable-schema');

airtableschema.configureSession({
    airtableSession: "your_host_airtable_session_value",
    airtableSessionSig: "your_host_airtable_session_SIG_value"
});

airtableschema.getBaseSchema({
    baseId: "appASDFSADFASDF"
}).then(res => console.log(JSON.stringify(res, null, 2)));
```
Or, passing the session as parameters:
```
const airtableschema = require('airtable-schema');

airtableschema.getBaseSchema({
    baseId: "appASDFSADFASDF",
    airtableSession: "your_host_airtable_session_value",
    airtableSessionSig: "your_host_airtable_session_SIG_value"
}).then(res => console.log(JSON.stringify(res, null, 2)));
```
Or, if you have setted the Environment Variables:
```
const airtableschema = require('airtable-schema');

airtableschema.getBaseSchema({
    baseId: "appASDFSADFASDF"
}).then(res => console.log(JSON.stringify(res, null, 2)));
```

## Methods
There are three available methods:
1. `getBaseSchema(options)`: returns the Schema of your base, including all the tables and columns.
2. `getTableSchema(options)`: returns the Schema of one table, including all the columns.
3. `getColumnSchema(options)`: returns the Schema of one column of one table.

`options` has these possible parameters:
```
{
    baseId, 
    tableId, 
    columnId, 
    airtableSession, 
    airtableSessionSig
}
```