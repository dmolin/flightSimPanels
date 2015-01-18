var _ = require("underscore");

module.exports = function(config) {
    //all the information for this instrument are contained in the x-type 17 and 18
    //so we simply proxy and return that JSON object..
    var data = {};
    
    _.extend(data, config.datarefs["17"], config.datarefs["18"]);
    
    return data;
};