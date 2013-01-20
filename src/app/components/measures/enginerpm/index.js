function callback(raw, Helper) {
	var dataView = new DataView(raw);
	var data = {};
	data.rpm = Helper.fix(dataView.getFloat32(0,true));
	return data;
}

//exported object
var measure = {
	xtype: "37",	//this is the instrument panel number, as sent by the server
	callback: callback
};

module.exports = measure;