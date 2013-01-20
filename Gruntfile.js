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

        unit: {
            url: "http://localhost:3000/test",
            dest: "target/unitReports"
        },

        watch: {
            files: [
                "src/*.js",
                "src/**/*.js",
                "src/**/**/*.js"
            ],
            tasks: "jshint"
        }

    });

    function groupAlias(alias, tasks) {
        grunt.registerTask(alias, function (target) {
            return grunt.task.run(tasks.split(" ").map(function (item) {
                return item + (target ? ":" + target : "");
            }));
        });
    }

    // Register alias tasks
    //groupAlias("build", "buildi18n buildtemplates buildjs buildspecs buildcss buildmanifest buildhtml");
    //groupAlias("serve", "staticserver mockserver");
    //groupAlias("test", "serve jshint build unit acceptance");
    //groupAlias("dev", "build serve watch");
    groupAlias("dev", "jshint serve watch");
    groupAlias("test", "serve jshint unit");

    // Default task.
    grunt.registerTask("default", ["dev"]);

};