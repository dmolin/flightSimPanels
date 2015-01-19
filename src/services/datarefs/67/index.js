/*
 * xtype: 67
 * name: Landing gear
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    
    var data = {
		gearN: Helper.fix(dataView.getFloat32(0,true)),
		gearL: Helper.fix(dataView.getFloat32(4,true)),
		gearR: Helper.fix(dataView.getFloat32(8,true))
    };
    
    return data;
};