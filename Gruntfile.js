'use strict';

module.exports = function(grunt) {

    // load all grunt tasks for use
    require('load-grunt-tasks')(grunt);
    var nconf = require('nconf');

    // get the config file
    var cfgFile = './Gruntfile.properties';
    nconf.use('file', {
        file: 'cfg/Gruntfile.properties',
        format: nconf.formats.json
    });
    nconf.load();
    var config = nconf.get();

    // prepare app params
    config.app.constants['buildVersion'] = '';
    config.app.constants['buildName'] = '';

    // task configurations
    grunt.initConfig({

        // load config parameters
        config: config,

        // watch config parameters
        watch: {
            dev: {
                options: {
                    livereload: config.servers.watch.port
                },
                files: [
                    '<%= config.paths.src %>/**/*.html',
                    '<%= config.paths.src %>/**/*.css',
                    '<%= config.paths.src %>/js/**/*.js',
                    '<%= config.paths.src %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= config.paths.test %>/**/*.js'
                ],
                tasks: [
                    'build:dev',
                    'jshint:dev',
                    'karma:dev:run'
                ]
            }
        }, // watch config parameters

        // connect config parameters
        connect: {
            dev: {
                options: {
                    port: config.servers.livereload.port,
                    hostname: '0.0.0.0',
                    base: '<%= config.paths.build %>/dev',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')({
                                port: config.servers.watch.port
                            }),
                            connect.static(options.base)
                        ]
                    }
                }
            }
        }, // connect config parameters

        // open config parameters
        open: {
            // opens the live reload url
            dev: {
                url: 'http://localhost:<%= connect.dev.options.port %>'
            }
        }, // open config parameters

        // ng-constant config parameters
        ngconstant: {
            dev: {
                options: {
                    name: 'ar:env',
                    dest: config.paths.build + '/dev/js/environment.js',
                    template: grunt.file.read('cfg/env.tmpl.ejs'),
                    constants: config.app.constants,
                    values: config.app.values
                }
            },
            ci: {
                options: {
                    name: 'ar:env',
                    dest: config.paths.build + '/ci/js/environment.js',
                    template: grunt.file.read('cfg/env.tmpl.ejs'),
                    constants: config.app.constants,
                    values: config.app.values
                }
            }
        }, // ng-constant config parameters

        // clean config paramters
        clean: {
            dev: ['build/dev'],
            ci: ['build/ci']
        }, // clean config paramters

        // copy config parameters
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: config.paths.src + '/',
                        src: '**',
                        dest: config.paths.build + '/dev/'
                    },
                    {
                        expand: true,
                        src: [
                            'bower_libs/jquery/dist/jquery.js',
                            'bower_libs/angular/angular.js',
                            'bower_libs/angular-xeditable/dist/js/xeditable.js',
                            'bower_libs/angular-dialog-service/dialogs.js',
                            'bower_libs/angular-bootstrap/ui-bootstrap-tpls.js',
                            'bower_libs/angular-dialog-service/dialogs-default-translations.js',
                            'bower_libs/angular-sanitize/angular-sanitize.js',
                            'bower_libs/dreamfactory-user-management/dreamfactory-user-management.js',
                            'bower_libs/angular-resource/angular-resource.js',
                            'bower_libs/angular-route/angular-route.js',
                            'bower_libs/angular-cookies/angular-cookies.js'
                        ],
                        dest: config.paths.build + '/dev/lib/',
                        flatten: true
                    }
                ]
            },
            ci: {
                files: [
                    {
                        expand: true,
                        cwd: config.paths.src + '/',
                        src: '**',
                        dest: config.paths.build + '/ci/'
                    },
                    {
                        expand: true,
                        src: [
                            'bower_libs/jquery/dist/jquery.js',
                            'bower_libs/angular/angular.js',
                            'bower_libs/angular-xeditable/dist/js/xeditable.js',
                            'bower_libs/angular-dialog-service/dialogs.js',
                            'bower_libs/angular-bootstrap/ui-bootstrap-tpls.js',
                            'bower_libs/angular-dialog-service/dialogs-default-translations.js',
                            'bower_libs/angular-sanitize/angular-sanitize.js',
                            'bower_libs/dreamfactory-user-management/dreamfactory-user-management.js',
                            'bower_libs/angular-resource/angular-resource.js',
                            'bower_libs/angular-route/angular-route.js',
                            'bower_libs/angular-cookies/angular-cookies.js'
                        ],
                        dest: config.paths.build + '/ci/lib/',
                        flatten: true
                    }
                ]
            }
        }, // copy config parameters

        // js-beautifier config parameters
        jsbeautifier: {
            dev: {
                files: {
                    src: ['build/dev/js/environment.js']
                }
            },
            ci: {
                files: {
                    src: ['build/ci/js/environment.js']
                }
            }
        }, // js-beautifier config parameters

        // jshint config parameters
        jshint: {
            // for development environment, report to stdio only
            dev: {
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [
                        '<%= config.paths.build %>/dev/lib/**/*.js',
                        '<%= config.paths.build %>/dev/js/environment.js',
                        '<%= config.paths.test %>/lib/**/*.js'
                    ]
                },
                src: [
                    '<%= config.paths.build %>/dev/**/*.js',
                    '<%= config.paths.test %>/**/*.js'
                ]
            },

            // for CI environment, creates checkstyle report
            ci: {
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [
                        '<%= config.paths.build %>/ci/lib/**/*.js',
                        '<%= config.paths.build %>/ci/js/environment.js',
                        '<%= config.paths.test %>/lib/**/*.js'
                    ],
                    reporter: 'checkstyle',
                    reporterOutput: '<%= config.paths.reports %>/checkstyle.xml',
                    force: true
                },
                src: [
                    '<%= config.paths.build %>/ci/**/*.js',
                    '<%= config.paths.test %>/**/*.js'
                ]
            }
        }, // jshint config parameters

        // karma config parameters
        karma: {
            // for development environment, report to stdio only
            dev: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome'],
                singleRun: false,
                background: true,
                options: {
                    files: [
                        'bower_libs/jquery/dist/jquery.js',
                        'bower_libs/angular/angular.js',
                        'bower_libs/angular-mocks/angular-mocks.js',
                        '<%= config.paths.test %>/spec_helper.js',
                        '<%= config.paths.build %>/dev/js/*.js',
                        '<%= config.paths.build %>/dev/js/**/*.js',
                        '<%= config.paths.test %>/mock/**/*.js',
                        '<%= config.paths.test %>/spec/**/*.js'
                    ]
                }
            },

            // for CI environment, creates junit coverage report
            ci: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'bower_libs/jquery/dist/jquery.js',
                        'bower_libs/angular/angular.js',
                        'bower_libs/angular-mocks/angular-mocks.js',
                        '<%= config.paths.test %>/spec_helper.js',
                        '<%= config.paths.build %>/ci/js/*.js',
                        '<%= config.paths.build %>/ci/js/**/*.js',
                        '<%= config.paths.test %>/mock/**/*.js',
                        '<%= config.paths.test %>/spec/**/*.js'
                    ]
                },
                colors: false,
                browsers: ['Firefox', 'Chrome'],
                reporters: ['junit', 'progress', 'coverage'],
                junitReporter: {
                    outputFile: '<%= config.paths.reports %>/test-results.xml'
                },
                preprocessors: {
                    'build/ci/js/**/*.js': 'coverage' // have to do this because the preprocessor won't process the <%= %>
                },
                coverageReporter: {
                    type: 'cobertura',
                    dir: '<%= config.paths.reports %>/coverage/'
                }
            }
        } // karma config parameters
    });

    // grunt target definitions

    // build target
    grunt.registerTask('build', function(buildType) {
        switch(buildType) {
            case 'dev':
            case 'ci':
                console.log('Building ' + buildType);

                // add build paramters
                config.app.constants['buildVersion'] = '0.DEV';
                config.app.constants['buildName'] = 'Development Build';

                grunt.task.run([
                    'clean:' + buildType,
                    'copy:' + buildType,
                    'ngconstant:' + buildType,
                    'jsbeautifier:' + buildType
                ]);
                console.log('Build Complete!\n');
                break;
            default:
                console.log('\'' + buildType + '\' is not a valid build type');
        }
    });

    // prepare and run development environment
    grunt.registerTask('devenv', function() {
        grunt.task.run([
            'build:dev',
            'connect:dev',
            'karma:dev', // start the server
            'open:dev',
            'watch:dev'
        ]);
    });

    // run CI test suite
    grunt.registerTask('ci', function() {
        grunt.task.run([
            'build:ci',
            'jshint:ci',
            'karma:ci'
        ]);
    });

};
