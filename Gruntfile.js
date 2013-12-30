module.exports = function (grunt) {
    var assetPath = 'fe/asset/';
    var cfg = {
        cssPath: assetPath + 'css/',
        jsPath: assetPath + 'js/',
        imgPath: assetPath + 'img/',
        htmlPath: assetPath + 'html/',
        mdPath: assetPath + 'md'
    };

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        less: {
            development: {
                files: [{
                    src: cfg.cssPath + '360eduindex/style.less',
                    dest: cfg.cssPath + '360eduindex/style.css'
                }]
            }
        },

        express: {
            options: {
                port: 3001,
                debug: true
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        markdown: {
            all: {
                  files: [{
                    expand: true,
                    src: cfg.mdPath + '**/*.md',
                    dest: cfg.mdPath + '/_html/',
                    ext: '.html'
                }]
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:3001/asset/html',
                app: 'chrome'
            }
        },

        watch: {
            less: {
                files: cfg.cssPath + '**/*.less',
                tasks: 'less'
            },
            md: {
                files: cfg.mdPath + '**/*.md',
                tasks: ['markdown']
            },
            express: {
                files: [
                    cfg.mdPath + '/_html/**/*.html',
                    cfg.htmlPath + '**/*.html',
                    cfg.jsPath + '**/*.js',
                    cfg.cssPath + '**/*.css',
                    cfg.cssPath + '**/*.less'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: false
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    name: 'home',
                    baseUrl: cfg.jsPath + 'page/360eduindex',
                    mainConfigFile: cfg.jsPath + 'page/360eduindex/home.js',
                    out: cfg.jsPath + 'page/360eduindex/home-r.js'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'express',
        'open',
        'watch'
    ]);

    grunt.registerTask('combile', [
        'requirejs'
    ]);
};