Measure = require('../services/MeasureFactory');

var measures = {}, io;

module.exports = {
	init: function(app, _io) {
		//mock measure data coming from TEST user
		io = _io;
		app.get('/test/:measure', onMockFSMessage);
	}
};


//test/:measure/:data
function onMockFSMessage ( req, res ) {
    var measureName = req.params.measure;

    var measures = {};
    console.log("name:" + measureName);
    console.log("req.query" + req.query);
    measures[measureName] = req.query;
    io.sockets.emit("data:measures", {data: measures});
    res.end();
}

function findMeasureByName(list, name) {
    console.log("find " + name + " in " + list);
    var res = list.filter(function(node){
        //console.log("node.name", node.name);
        return node.name === name;
    });
    return res.length > 0 ? res[0] : undefined;
}

function mockMeasureData(query) {
    console.log(query);
    return query;
}
