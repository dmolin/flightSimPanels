/*
 * xtype: 24
 * name: Altitude
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    return {
        altitude: Helper.fix(dataView.getFloat32(20, true))
    };
};
