/*
 * xtype: 37
 * name: Engine RPMs
 */
module.exports = function(raw, Helper) {
    var dataView = new DataView(raw);
    
    var data = {
    	rpm: Helper.fix(dataView.getFloat32(0,true))
    };
    
    return data;
};
