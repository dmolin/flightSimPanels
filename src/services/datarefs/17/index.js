/*
 * xtype: 17
 * name: Attitude
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
	
    var data = {
	    pitch: Helper.fix(dataView.getFloat32(0,true)),
	    roll: Helper.fix(dataView.getFloat32(4,true)),
	    trueheading: Helper.fix(dataView.getFloat32(8,true)),
	    magheading: Helper.fix(dataView.getFloat32(12,true))
    };
    
    return data;
};
