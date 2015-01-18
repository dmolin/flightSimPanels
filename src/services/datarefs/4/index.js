/*
 * xtype: 4
 * name: Vertical speed
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    var data = {};
    data.mach = Helper.fix(dataView.getFloat32(0,true));  //this is the 'ratio'
    data.speed = Helper.fix(dataView.getFloat32(8,true)); //this is the feet per minute
    return data;
};
