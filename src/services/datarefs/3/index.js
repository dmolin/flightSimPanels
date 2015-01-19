/*
 * xtype: 3
 * name: Airspeed
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    
    var data = {
	    indicated: Helper.fix(dataView.getFloat32(0,true)),
	    equivalent: Helper.fix(dataView.getFloat32(4,true)),
	    trueair: Helper.fix(dataView.getFloat32(8,true)),
	    truegnd: Helper.fix(dataView.getFloat32(12,true)),
	    mph: Helper.fix(dataView.getFloat32(20,true)),
	    mphair: Helper.fix(dataView.getFloat32(24,true)),
	    mphgnd: Helper.fix(dataView.getFloat32(28,true))
    };
    
    return data;
};
