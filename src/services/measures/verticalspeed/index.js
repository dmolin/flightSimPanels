function callback(raw, Helper) {
	var dataView = new DataView(raw);
	var data = {};
	data.mach = Helper.fix(dataView.getFloat32(0,true));  //this is the 'ratio'
	data.speed = Helper.fix(dataView.getFloat32(8,true)); //this is the feet per minute

	console.log("VSI", data);
	return data;
}

//exported object
var measure = {
	xtype: "4",		//this is the instrument panel number, as sent by the server
	callback: callback
};

module.exports = measure;
