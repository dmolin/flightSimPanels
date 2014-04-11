function callback(raw, Helper) {
	var dataView = new DataView(raw);
	var data = {};
	data.mach = Helper.fix(dataView.getFloat32(0,true));
	data.speed = Helper.fix(dataView.getFloat32(8,true));

	/*
	data.indicated = Helper.fix(dataView.getFloat32(0,true));
	data.equivalent = Helper.fix(dataView.getFloat32(4,true));
	data.trueair = Helper.fix(dataView.getFloat32(8,true));
	data.truegnd = Helper.fix(dataView.getFloat32(12,true));
	//measure.data.filler = dataView.getFloat32(16,true); //not used -999
	data.mph = Helper.fix(dataView.getFloat32(20,true));
	data.mphair = Helper.fix(dataView.getFloat32(24,true));
	data.mphgnd = Helper.fix(dataView.getFloat32(28,true));
	*/
	//console.log("VSI DataView", dataView);
	console.log("VSI", data);
	return data;
}

//exported object
var measure = {
	xtype: "4",		//this is the instrument panel number, as sent by the server
	callback: callback
};

module.exports = measure;