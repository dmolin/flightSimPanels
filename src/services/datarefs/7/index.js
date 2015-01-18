/*
 * xtype: 7
 * name: System pressures
 */
module.exports = function(raw, Helper) {
    var data = new DataView(raw),
        baro = Helper.fix(data.getFloat32(0, true)),
        mbar = Helper.fix(baro * 33.863886);

    return { pressures: {
                    baro: baro,
                    mbar: mbar
                }
            };
};
