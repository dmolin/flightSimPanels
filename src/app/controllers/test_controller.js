load('application');

//var walk = require('walk');
var fs = require('fs');
var uglify = require('uglify-js');
var helpers = railway.helpers.personalize(this);

function treeWalker(folder, cfg) {
	var file,
		filename,
		files,
		retlist = (cfg && cfg.list)||[];

	files = fs.readdirSync(folder);	

	for (file in files) {
		if (files.hasOwnProperty(file)) {
			filename = files[file];

			//console.log("evaluating " + folder + filename);
			if (cfg.first && (cfg.first.indexOf(folder + filename)) >= 0) {
				//discard.
				console.log("discarding " + folder + filename);
				continue;
			}

			fileStat = fs.statSync(folder + filename);
			if( fileStat.isDirectory() ) {
				treeWalker(folder + filename + "/", {list:retlist});
			} else {
				retlist.push(folder + filename);
			}
		}
	}

	return retlist;	
}

function addCode(list, ext, config) {
	var file,
		filename,
		fileStat,
		cfg = {minify: config.minify||false, folder:config.folder||"../test/libs/jasmine/"},
		//files = fs.readdirSync(cfg.folder);
		files = treeWalker(cfg.folder, config);
	
	for (file in files) {
		if (files.hasOwnProperty(file)) {
			filename = files[file];

			if (!filename.match(new RegExp(".*." + ext))) {
				//not a javascript file. discard
				continue;
			}

			if (cfg.minify) {
				list.push(uglify.minify(filename, 'utf8').code);
			} else {
				list.push( fs.readFileSync(filename, 'utf8') );
			}
		}
	}
	//console.log("done. added " + list.length + " files.\n");
	return list;
}

function getFile(file, opts) {
	return opts && opts.minify ? uglify.minify(file, 'utf8').code : fs.readFileSync(filename, 'utf8');
}

function addSpecs(list) {
	var files = grunt.file.expandFiles([ "./app/*/*.spec.js", "./app/*.spec.js"]);
}


function getFiles(ext, opts) {
	var scripts = [],
		i;
	if (opts && opts.first) {
		//add first these files...
		for(i=0; i < opts.first.length; i++) {
			scripts.push(getFile(opts.first[i], opts));
		}
	}
	addCode(scripts, ext, opts||{minify:false});
	return scripts.join('\n');
}


action('index', function() {
	layout(false);
	render();
});

action('code', function() {
	layout(false);
	header('Content-Type', 'application/javascript');
	send(getFiles("js", {
		minify:true, 
		first:[
			"../test/libs/jasmine/jasmine.js"
		]
	}));
});

action('css', function() {
	layout(false);
	header('Content-Type', 'text/css');
	send(getFiles("css"));
});

action('specs', function() {
	layout(false);
	header('Content-Type', 'application/javascript');
	send(getFiles("spec.js", {minify:true, folder:"./app/"}));
});