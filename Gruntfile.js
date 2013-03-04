module.exports = function (grunt) {

    grunt.loadTasks("build-tasks");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-testacular");

    grunt.initConfig({
        jshint: [
            "src/app/**/*.js"
        ],

        /* TODO: use the server task for the unit tests
        server: {
            port: 9000,
            base: './'
        }*/

        serve: {
            //async: true
        },

        watch: {
            files: [
                "src/*.js",
                "src/**/*.js",
                "src/**/**/*.js"
            ],
            tasks: "jshint"
        },

        testacular: {
            unit: {
                options: {
                    configFile: "testacular.conf.js",
                    autoWatch: true,
                    browsers: ['PhantomJS'],
                    reporters: ['dots'],
                    runnerPort: 9100,
                    keepalive: true
                }
            }
        }

    });

    function group(alias, tasks) {
        grunt.registerTask(alias, function (target) {
            return grunt.task.run(tasks.split(" ").map(function (item) {
                return item + (target ? ":" + target : "");
            }));
        });
    }

    // Register alias tasks
    group("dev", "jshint serve");
    group("test", "serve jshint testacular");

    // Default task.
    grunt.registerTask("default", ["dev"]);

};