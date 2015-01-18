/*
 * xtype: 3
 * name: Airspeed values
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    var data = {};
    data.indicated = Helper.fix(dataView.getFloat32(0,true));
    data.equivalent = Helper.fix(dataView.getFloat32(4,true));
    data.trueair = Helper.fix(dataView.getFloat32(8,true));
    data.truegnd = Helper.fix(dataView.getFloat32(12,true));
    data.mph = Helper.fix(dataView.getFloat32(20,true));
    data.mphair = Helper.fix(dataView.getFloat32(24,true));
    data.mphgnd = Helper.fix(dataView.getFloat32(28,true));
    return data;
};
