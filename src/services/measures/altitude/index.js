var _ = require("underscore");

/*
 * name: Altitude Indicator
 * This instrument uses x-types:
 *   -  7 (system pressures)
 *   - 20 (altitude)
 */
 module.exports = function(config) {
    return _.extend( config.datarefs["20"], config.datarefs["7"] );
};
