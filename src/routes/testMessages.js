Measure = require('../services/Measure');

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

    console.log("measure", measureName);
    console.log("measures", Measure.getRegisteredMeasures() );
    var measure = findMeasureByName(Measure.getRegisteredMeasures(), measureName);
    measure.data = mockMeasureData(req.query);

    //console.log("measure[" + i + "]", measure);
    if (measure) {
        measures[measure.name] = measure.data;
    }

    io.sockets.emit("data:measures", {data:measures});

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