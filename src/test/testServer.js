/*jshint devel:true, node:true, strict:false */
/*global require:true */

var express = require("express"),
    path = require("path"),
    dgram = require('dgram'),
    http = require("http"),
    Measure = require('../services/Measure'),
    app = express(),
    url = require('url');

var server;
var measures = {};
var socket;
var sio = require('socket.io');
var io;
var setting;

app.configure(function() {
    app.use(express.logger("dev")); //short,tiny,dev
    app.use(express.bodyParser());
    app.use(express['static'](path.join(__dirname, '../public')));
});

server = http.createServer(app);

require('../routes/assetsRoutes').init(app);
require('../routes/widgetsRoutes').init(app);

//mock measure data coming from TEST user
app.get('/test/:measure', onMockFSMessage);

//Initialise Measures Factory
Measure.init();

io = sio.listen(server);
for (setting in app.settings.socketIO) {
    if (app.settings.socketIO.hasOwnProperty(setting)) {
        io.set(setting, app.settings.socketIO[setting]);
    }
}
io.on('connection', onSIOConnect);

if (!module.parent) {
    var port = process.env.PORT || 9000;
    server.listen(port);
    console.log("FlighSimPanels Test Server listening on port %d within %s environment", port, app.settings.env);
}

function onSIOConnect (socket) {
    socket.emit("connected", {});
    //handle client messages (if any)
}


//test/:measure/:data
function onMockFSMessage ( req, res ) {
    var measureName = req.params.measure;

    //console.log("MSG", message );
    var measure = findMeasureByName(Measure.getRegisteredMeasures(), measureName);
    measure.data = mockMeasureData(req.query);

    //console.log("measure[" + i + "]", measure);
    if (measure) {
        measures[measure.name] = measure.data;
    }

    io.sockets.emit("data:measures", {data:measures});

    res.end("measure sent to browsers");
}

function findMeasureByName(list, name) {
    var res = list.filter(function(node){
        return node.name === name;
    });
    return res.length > 0 ? res[0] : undefined;
}

function mockMeasureData(query) {
    console.log(query);
    return query;
}