function callback(raw, Helper) {
	var dataView = new DataView(raw);
	var data = {};
	data.pitch = Helper.fix(dataView.getFloat32(0,true));
	data.roll = Helper.fix(dataView.getFloat32(4,true));
	data.trueheading = Helper.fix(dataView.getFloat32(8,true));
	data.magheading = Helper.fix(dataView.getFloat32(12,true));
	return data;
}

//exported object
var measure = {
	xtype: "17",	//this is the instrument panel number, as sent by the server
	callback: callback
};

module.exports = measure;