/*
 * xtype: 18
 * name: Slip
 */
module.exports = function(raw, Helper) {
	var dataView = new DataView(raw);
	
	var data = {
		slip: Helper.fix(dataView.getFloat32(28,true))
	};
	
	return data;
};