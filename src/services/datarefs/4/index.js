/*
 * xtype: 4
 * name: Vertical speed
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    
    var data = {
	    mach: Helper.fix(dataView.getFloat32(0,true)), //this is the 'ratio'
	    speed: Helper.fix(dataView.getFloat32(8,true)) //this is the feet per minute
    };
    
    return data;
};