module.exports = function (grunt) {

    grunt.loadTasks("build-tasks");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

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
            async: true
        },

        /* STILL IN DEVELOPMENT
        unit: {
            url: "http://localhost:3000/test",
            dest: "target/unitReports"
        },
        */

        watch: {
            files: [
                "src/*.js",
                "src/**/*.js",
                "src/**/**/*.js"
            ],
            tasks: "jshint"
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
    group("dev", "jshint serve watch");
    group("test", "serve jshint unit");

    // Default task.
    grunt.registerTask("default", ["dev"]);

};