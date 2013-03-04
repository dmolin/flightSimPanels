/*jshint devel:true, node:true, strict:false */
/*global require:true */

var express = require("express"),
	path = require("path"),
	dgram = require('dgram'),
	http = require("http"),
	Measure = require('./services/Measure'),
	app = express();

var server;
var measures = {};
var socket;
var sio = require('socket.io');
var io;
var setting;

app.configure(function() {
	app.use(express.logger("dev")); //short,tiny,dev
	app.use(express.bodyParser());
	app.use(express['static'](path.join(__dirname, 'public')));
});

server = http.createServer(app);

require('./routes/assetsRoutes').init(app);
require('./routes/widgetsRoutes').init(app);

//Initialise Measures Factory
Measure.init();

//Create Receiving UDP Socket
socket = dgram.createSocket('udp4', onMessage);
socket.bind(49100);

io = sio.listen(server);
for (setting in app.settings.socketIO) {
	if (app.settings.socketIO.hasOwnProperty(setting)) {
		io.set(setting, app.settings.socketIO[setting]);
	}
}
io.on('connection', onSIOConnect);

if (!module.parent) {
    var port = process.env.PORT || 3000;
    server.listen(port);
	console.log("FlighSimPanels server listening on port %d within %s environment", port, app.settings.env);
}

function onSIOConnect (socket) {
	socket.emit("connected", {});
	//handle client messages (if any)
	//...
}

function onMessage ( message ) {
	var length = message.length - 5; //avoid the prologue "DATAx";
	var sentences = length / 36;

	//console.log("MSG", message );
	for (var i = 0; i < sentences; i++ ) {
		var measure = Measure.get(Array.prototype.slice.call(message, (i*36)+5));

		//console.log("measure[" + i + "]", measure);
		if (measure) {
			measures[measure.name] = measure.data;
		}
	}

	io.sockets.emit("data:measures", {data:measures});
}