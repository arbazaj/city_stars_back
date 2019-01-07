/*jslint node: true */
"use strict";  

var config = require('./config/config');
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var timeout = require('connect-timeout');
var _portSocket = config.APP_PORT;

var server = app.listen(0, 'localhost')



app.use(cors());
app.use(timeout('200s'))


app.use(bodyParser.urlencoded({ limit: '50mb', 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json
app.use(bodyParser.json({ limit: '50mb', type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)


// handle app level errors
app.use(function(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

// handle app level errors
var errorFilter = function(err, req, res, next) {
    console.log("errorFilter here");
    if (!res.headersSent) { //just because of your current problem, no need to exacerbate it.
        var errcode = err.status || 500; //err has status not statusCode
        var msg = err.message || 'server error!';
        res.status(errcode).send(msg); //the future of send(status,msg) is hotly debated
    };
}

app.use(errorFilter);

function haltOnTimedout(req, res, next) {
    if (!req.timedout)
        next();
}

require('./src/helpers/passport.facebook')(app);
require('./src/helpers/passport.goole')(app);

require('./lib/mongoconnection');
require('./src/routes/index')(app);
server.listen(_portSocket, function() {
    console.log('Express server listening on %d, in %s mode', _portSocket,
        app.get('env'));
});
