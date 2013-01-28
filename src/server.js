#!/usr/bin/env node

var app = module.exports = require('railway').createServer();
var dgram = require('dgram');
var Measure = require('./app/components/Measure');
var measures = {};
var socket;
var sio = require('socket.io');
var io;
var setting;

app.configure(function () {
    app.set('defaultLocale', 'en');
    app.set('log', false);
});

//Initialise Measures Factory
Measure.init();

//Create Receiving UDP Socket
socket = dgram.createSocket('udp4', onMessage);
socket.bind(49100);

io = sio.listen(app);
for (setting in app.settings.socketIO) {
	if (app.settings.socketIO.hasOwnProperty(setting)) {
		io.set(setting, app.settings.socketIO[setting]);
	}
}
io.on('connection', onSIOConnect);

if (!module.parent) {
    var port = process.env.PORT || 9000;
    app.listen(port);
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