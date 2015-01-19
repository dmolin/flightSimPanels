var _ = require("underscore");

/*
 * name: Altitude Indicator
 * This instrument uses x-types:
 *   -  7 (system pressures)
 *   - 24 (altitute)
 */
 module.exports = function(config) {
    return _.extend( config.datarefs["24"], config.datarefs["7"] );
};
