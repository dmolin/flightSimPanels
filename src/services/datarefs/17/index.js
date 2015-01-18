/*
 * xtype: 17
 * name: Attitude indicator
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    var data = {};
    data.pitch = Helper.fix(dataView.getFloat32(0,true));
    data.roll = Helper.fix(dataView.getFloat32(4,true));
    data.trueheading = Helper.fix(dataView.getFloat32(8,true));
    data.magheading = Helper.fix(dataView.getFloat32(12,true));
    return data;
};
