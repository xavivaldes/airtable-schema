# airtable-schema
Workaround to retrieve the Base schema from Airtable. Waiting for improvements on Metadata API.

## How it works
The functionality is really basic. It uses the Web Client API of airtable to retrieve the schema. You can just perform this fetch:
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

## Installation
`npm install airtable-schema`

## Finding out the cookies
Before to use this library (or to perform the fetch manually), you need to find out two cookis. You can follow these steps:
1. Go to airtable http://airtable.com
2. Open Developer tools (F12)
3. Open Network tab in Developer tools
4. Now open your base, and some record of any table.
5. In Developer tools -> Network tab: Look for any `readXXX` call (like `readData` or `readForDetailView`), click on it
6. Inspect the cookies on Request Headers
7. Look for these Cookies, and save the values:
```
__Host-airtable-session=sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP
__Host-airtable-session.sig=KJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ
```

## Configuration
Now you can configure the library. There are three options to configure.

### Environment variables
You can set these two Environment variables with the Cookie values
```
AIRTABLE_SESSION=sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP
AIRTABLE_SESSION_SIG=KJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ
```

### Calling configureSession
You can call `configureSession` function
```
const airtableschema = require('airtable-schema');

airtableschema.configureSession({
    airtableSession: "sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP",
    airtableSessionSig: "AIRTABLE_SESSION_SIGKJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ"
});
```

### Parameters in the methods
Or you can pass the two parameters each time you call a method.

# Usage
```
const airtableschema = require('./index');

airtableschema.configureSession({
    airtableSession: "sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP",
    airtableSessionSig: "KJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ"
});

airtableschema.getBaseSchema({
    baseId: "appASDFSADFASDF"
}).then(res => console.log(JSON.stringify(res, null, 2)));
```
or
```
const airtableschema = require('./index');

airtableschema.getBaseSchema({
    baseId: "appASDFSADFASDF",
    airtableSession: "sasdkfjkKDFKKDJF204IJFISLKFJIJ934JO8JFNAKJkjfij034jfLNJ09J0f0j4F4FLj94fj4LJF94wjg09JWLF9j9PJP",
    airtableSessionSig: "KJDSLKAJFNijkjkjsldkjlfhesijf93jslkdjflkjijLJLIJSLGJ"
}).then(res => console.log(JSON.stringify(res, null, 2)));
```

There are three methods available:
1. `getBaseSchema(options)`: returns the Schema of your base, including all the tables and columns.
2. `getTableSchema(options)`: returns the Schema of one table, including all the columns.
3. `getColumnSchema(options)`: returns the Schema of one column of one table.

`options` has this possible parameters:
```
{
    baseId, 
    tableId, 
    columnId, 
    airtableSession, 
    airtableSessionSig
}
```