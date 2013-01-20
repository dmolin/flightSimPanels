load('application');

var fs = require('fs');
var uglify = require('uglify-js');
var Measure = require('../components/Measure');

function getCommonCode(list) {
	var file,
		folder = "./app/components/common/",
		filename,
		fileStat,
		files = fs.readdirSync(folder);
	
	for (file in files) {
		if (files.hasOwnProperty(file)) {
			filename = files[file];
			if (!(/.*\.js/.test(filename))) {
				//not a javascript file. discard
				continue;
			}
			fileStat = fs.statSync(folder + filename);
			if( fileStat.isDirectory() ) {
				continue;
			}
			list.push(uglify.minify(folder + filename, 'utf8').code);
		}
	}
	return list;
}

function getMeasureEntities(suffix, list) {
	var measures = Measure.getRegisteredMeasures(),
		idx,
		measure;
	for(idx in measures) {
		if(measures.hasOwnProperty(idx)){
			measure = measures[idx];
			try {
				//list.push( fs.readFileSync(__dirname + '/../components/measures/' + measure.name + '/client/' + measure.name + '.' + suffix, 'utf8') );
				list.push(uglify.minify(__dirname + '/../components/measures/' + measure.name + '/client/' + measure.name + '.' + suffix, 'utf8').code);
			} catch( error ) {}
		}
	}
	return list;
}


/**
 * This operation has to be moved at build time, along with CSS and templates parsing
 */
function addWidgets() {
	//add the registered widgets code to the page
	var scripts = [];
	getCommonCode(scripts);
	getMeasureEntities('js', scripts);
	return scripts.join('\n');
}

function addCss() {
	//add the registered widgets code to the page
	var scripts = [];
	getMeasureEntities('css', scripts);
	return scripts.join('\n');
}


action('code', function() {
	layout(false);
	header('Content-Type', 'application/javascript');
	send(addWidgets());
});


action('css', function() {
	layout(false);
	header('Content-Type', 'text/css');
	send(addCss());
});