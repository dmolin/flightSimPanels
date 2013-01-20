/*global module: true, require: true, process: true */
module.exports = function (grunt) {

    var path = require("path");

    grunt.registerTask("unit", "Run Jasmine unit tests tests", function () {
        var done = this.async(),
            cfg = grunt.config.data.unit,
            script = path.join(process.cwd(), "build-tasks/lib/phantom-runner.js");

        grunt.util.spawn({
            cmd: "phantomjs",
            args: [ "--ignore-ssl-errors=yes", script, cfg.url, cfg.dest ]

        }, function (err, result, code) {
            if (!err) {
                return done();
            }

            grunt.log.error("Error running phantomJS");

            if (code === 127) {
                grunt.fail.warn(
                    "In order for this task to work properly, PhantomJS must be " +
                    "installed and in the system PATH (if you can run \"phantomjs\" at" +
                    " the command line, this task should work). Unfortunately, " +
                    "PhantomJS cannot be installed automatically"
                );
            } else {
                grunt.log.writeln(result.stdout);
            }

            if (code > 1) {
                grunt.fail.warn("Unit tests failed with " + code + " failures");
            } else {
                grunt.fail.warn("PhantomJS exited unexpectedly with exit code " + code);
            }
            done();
        });

    });

};