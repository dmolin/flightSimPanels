/*
 * xtype: 13
 * name: Flaps
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
	
    var data = {
	   flaps: Helper.fix(dataView.getFloat32(16,true))
    };
    
    return data;
};