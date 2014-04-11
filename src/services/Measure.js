var fs = require('fs');

/*
 * Singleton Manager for X-Plane measures
 */
var Measure = {
	init: init,
	get: get,
	getRegisteredMeasures: getRegisteredMeasures
};

var Helper = {
	fix: function (value) {
		return parseFloat(value).toFixed(2);
	}
};

var lut = {};

function init() {
	//scan measures folder and register handlers
	var files = fs.readdirSync(__dirname + '/measures');
	var measure,
		filename,
		fileStat,
		tot = 0;

	for ( var file in files ) {
		if (files.hasOwnProperty(file)) {
			filename = files[file];
			fileStat = fs.statSync(__dirname + "/measures/" + filename);
			if( !fileStat.isDirectory() ) {
				continue;
			}
			measure = require(__dirname + '/measures/' + filename);
			measure.name = filename;
			if (!measure.xtype || !measure.callback) {
				//console.log( "discarding measure for non-conformance. => " + measure);
				continue;
			}
			lut[measure.xtype] = measure; //contains xtype, name, data, callback
			tot++;
		}
	}
	console.log("registered " + tot + " measures (instrument panels)");
}


//look into the payload and create the corresponding measure by type
function get(payload) {
	var measure = null;
	var xtype = payload[0],
		raw = new Int8Array(Array.prototype.splice.call(payload, 4, 32));

	//console.log("raw message", raw);
	if (!lut[xtype]) { return null; }

	if (typeof lut[xtype].callback === "function") {
		//call it.
		//Thanks to Adam Veselič for noticing that DataView works only with an ArrayBuffer (not a View over an ArrayBuffer)
		lut[xtype].data = lut[xtype].callback(raw.buffer, Helper);
	}
	return lut[xtype];
}

function getRegisteredMeasures() {
	var measures = [];
	for( var xtype in lut ) {
		if(lut.hasOwnProperty(xtype)) {
			measures.push(lut[xtype]);
		}
	}
	return measures;
}

module.exports = Measure;