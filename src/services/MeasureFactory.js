var fs = require('fs'),
	_ = require('underscore');

/*
 * Singleton Manager for X-Plane measures
 */
var Measure = {
	init: init,
	decodeMessage: decodeMessage,
	getRegisteredMeasures: getRegisteredMeasures
};

var Helper = {
	fix: function (value) {
		return parseFloat(value).toFixed(2);
	}
};

//Hashtables for dataref processors and measures processors
//A processor is nothing more than a decoding function
var datarefProcessors = {};  //hashtable xtype -> decoding function
var measureProcessors = {};	 //hashtable measureName -> processing function

/**
 * Initialize the factory, registering datarefs and measures processors
 */
function init() {
	var totProcessors,
		totMeasures;

	function nameBinder(fn, name) { this[name] = fn; }

	totProcessors = _processFolders(__dirname + "/datarefs", nameBinder.bind(datarefProcessors));
	totMeasures = _processFolders(__dirname + "/measures", nameBinder.bind(measureProcessors));

	//we now have both hastables loaded.
	console.log("Registered " + totMeasures + " measures (instrument panels) and " + totProcessors + " x-type decoders");
}


/**
 * decode the entire dataref message into x-type processors,
 * then call each measure processor and return an object containing all the decoded measures
 */
function decodeMessage(message) {

	//step 1: decode all the message into the decodedDatarefs hash
	var decodedDatarefs = _extractDatarefs(message, datarefProcessors);

	//step 2: iterate through the registered measures and build each one using its callback
	//        and providing access to the decoded datarefs
	var decodedMeasures = _extractMeasures(measureProcessors, decodedDatarefs);

	return decodedMeasures;
}

/**
 * Return a list of measure names registered in this Factory
 */
function getRegisteredMeasures() {
	return _.keys(measureProcessors);
}

/**
 * Goes through the list of commonjs modules present within @folderName and run the callback function @processor
 */
function _processFolders(folderName, processor) {
	var files = fs.readdirSync(folderName),
		file,
		filename,
		fullModuleName,
		fileStat,
		module,
		tot = 0;

	if(!_.isFunction(processor)) {
		//processor must be a function callback
		return tot;
	}

	_.each(files, function(filename) {
		//check if the file is a folder and is readable
		fullModuleName = folderName + "/" + filename;
		fileStat = fs.statSync(fullModuleName);
		if( !fileStat.isDirectory() ) {
			return;
		}

		//require the file (load the folder/index.js module entrypoint)
		//this should return a function; if not -> bail out
		module = require(fullModuleName);
		if(!_.isFunction(module)) {
			return;
		}
		//invoke the callback passing the module function and the folder name
		processor(module, filename);
		tot++;
	});

	return tot;
}

/**
 * Given the complete UDP message received from the Server, decode its content using the datarefProcessors
 * and build an object (indexed by xtype) with the decoded values for each xtype
 */
function _extractDatarefs(message, datarefProcessors) {
	var i, dataref, payload;
	var length = message.length - 5; //avoid the prologue "DATAx";
	var sentences = length / 36;  //compute the number of x-type datarefs in the message
	var decodedDatarefs = {};  //this hash will contain x-type -> json decoded data

	for (i = 0; i < sentences; i++ ) {
		//extract each dataref block (removing the 5 bytes prefix)
		payload = Array.prototype.slice.call(message, (i*36)+5);
		xtype = payload[0];
		console.log("processing xtype " + xtype);
		if(datarefProcessors[xtype]) {
			dataref = new Int8Array(Array.prototype.splice.call(payload, 4, 32));
			//decode the single dataref using the matching datarefProcessor
			decodedDatarefs[xtype] = datarefProcessors[xtype](dataref.buffer, Helper);
		}
	}
	return decodedDatarefs;
}

/**
 * Goes through the registered measures processors and call each one of them,
 * providing the decoded datarefs in input
 */
function _extractMeasures(measuresProcessors, decodedDatarefs) {
	var measures = {},
		outcome;
	_.each(_.keys(measuresProcessors), function(processorName) {
		outcome = measureProcessors[processorName]({
			datarefs: decodedDatarefs,
			helper: Helper
		});
		if(outcome) {
			measures[processorName] = outcome;
		}
	});

	console.log("got measures", measures);
	return measures;
}

module.exports = Measure;
