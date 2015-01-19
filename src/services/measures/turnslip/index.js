var _ = require("underscore");

module.exports = function(config) {
    //all the information for this instrument are contained in the x-type 17 and 18
    //so we simply proxy and return that JSON object..
    return _.extend( config.datarefs["17"], config.datarefs["18"] );
};