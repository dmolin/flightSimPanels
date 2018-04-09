var fs = require('fs');
var uglify = require('uglify-js');
var Measure = require('../services/MeasureFactory'),
    _ = require("underscore");

function getCommonCode(list) {
    var file,
        folder = __dirname + "/../services/common/",
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
            list.push(fs.readFileSync(folder + filename, 'utf8'));
            //list.push(uglify.minify(folder + filename, 'utf8').code);
        }
    }
    return list;
}

function getMeasureEntities(suffix, names, list, fill) {

    //until we have a layout editor, this is the low and dirty way to have a layout of widgets...
    var order = {
        js: names
    };

    var widgets = {};

    var measures = Measure.getRegisteredMeasures();
    _.each(measures, function(measure) {
        try {
            widgets[measure] = ( fs.readFileSync(__dirname + '/../services/measures/' + measure + '/client/' + measure + '.' + suffix, 'utf8') );
        } catch( error ) {}
    });

    //order the list
    if(order[suffix]) {
        order[suffix].forEach(function(name) {
            list.push(widgets[name]);
            delete (widgets[name]);
        });
    }
    if (fill) {
      //add the remaining ones, if any
      _.each(_.keys(widgets), function(key) {
          list.push(widgets[key]);
      });
    }
    return list;
}


/**
 * This operation has to be moved at build time, along with CSS and templates parsing
 */
function addWidgets(names, fill) {
    //add the registered widgets code to the page
    var scripts = [];
    getCommonCode(scripts);
    getMeasureEntities('js', names, scripts, fill);
    return scripts.join('\n');
}

function addCss(names) {
    //add the registered widgets code to the page
    var scripts = [];
    getMeasureEntities('css', names, scripts, fill);
    return scripts.join('\n');
}

function getCode(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    if (req.params.name != undefined && req.params.name != "") {
        res.send(addWidgets([req.params.name]));
    }
    res.send(addWidgets(['speed', 'attitude', 'altitude', 'turnslip', 'dg', 'verticalspeed'], true));
}

function getCss(req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.send(addCss(['speed', 'attitude', 'altitude', 'turnslip', 'dg', 'verticalspeed'], true));
}

exports.init = function (app) {
    app.get('/widgets/code', getCode);
    app.get('/widgets/code/:name', getCode);
    app.get('/widgets/css', getCss);
    return this;
};
