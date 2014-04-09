module.exports = function (grunt) {
    grunt.loadTasks("build-tasks");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-cafe-mocha');

    grunt.initConfig({
        jshint: [
            "src/app/**/*.js"
        ],

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

        cafemocha: {
            test: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            }
        }

    });

    // Register alias tasks
    grunt.registerTask("dev", ["jshint", "serve"]);
    grunt.registerTask('test', ['jshint','cafemocha:test']);

    // Default task.
    grunt.registerTask("default", ["dev"]);

};
