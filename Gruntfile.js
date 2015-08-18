/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
            // Metadata.
            pkg: grunt.file.readJSON('package.json'),
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
            // Task configuration.concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        nodeunit: {
            files: ['test/**/*_test.js']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: "app",
                    optimize: "uglify",
                    baseUrl: "app",
                    mainConfigFile: "./app/require-config.js",
                    out: "./app-dist/require-config.js"
                }
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9999,
                    hostname: 'localhost',
                    onCreateServer: function(server, connect, options) {
                        var io = require('socket.io').listen(server);
                        io.sockets.on('connection', function(socket) {
                            // do something with socket
                        });
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                singleRun: false // set this to false

            }
        }
    });

// These plugins provide necessary tasks.
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-nodeunit');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-karma');

grunt.registerTask('rjs', ['requirejs']);
// Default task.
grunt.registerTask('original', ['jshint', 'nodeunit', 'concat', 'uglify']);
grunt.registerTask('default', ['concat', 'uglify']);

};
