/*global module: true, require: true */
module.exports = function (grunt) {
    grunt.registerTask("serve", "Start Server", function () {
        var done = grunt.config.data.serve.async ? function () {} : this.async(),
            cp = require("child_process"),
            server;

        grunt.log.writeln("Starting webserver...");

        server = grunt.util.spawn({
            cmd: "node",
            args: ["server"],
            opts: { cwd: process.cwd() + "/src" }
        }, function (err, result, code) {
            if (err) {
                grunt.log.error("Error running webserver. err=" + err);
                return done(false);
            }

            done(result);
        });

        server.stdout.on('data', function (data) {
            grunt.log.write(("" + data).green);
        });

        server.stderr.on('data', function (data) {
            grunt.log.error(("" + data).green);
        });

        server.on('exit', function (code) {
            console.log("process exiting");
            done();
        });

        server.on('close', function (code) {
            console.log("process closing");
            done();
        });

    });

};