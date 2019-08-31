module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
                '* app.js v<%= pkg.version %> by @fat and @mdo\n' +
                '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
                '*/\n',
        jqueryCheck: 'if (!jQuery) { throw new Error(\"Bootstrap requires jQuery\") }\n\n',
        // Task configuration.
        clean: {
            dist: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %><%= jqueryCheck %>',
                stripBanners: false
            },
            bootstrap: {
                src: ['assets/js/transition.js', /*'assets/js/alert.js',*/ 'assets/js/button.js', /*'assets/js/carousel.js', 'assets/js/collapse.js',*/ 'assets/js/dropdown.js', 'assets/js/modal.js', /*'assets/js/tooltip.js', 'assets/js/popover.js', 'assets/js/scrollspy.js',*/ 'assets/js/tab.js', /*'assets/js/affix.js',*/ 'assets/js/snap.js', 'assets/js/bootstrap-select.js', 'assets/js/plugins/*.js'],
                dest: 'assets/dist/js/app.js'
            }
        },
        jshint: {
            options: {
                jshintrc: 'assets/js/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['assets/js/*.js']
            }
        },
        recess: {
            options: {
                compile: true
            },
            bootstrap: {
                files: {
                    'assets/dist/css/site.css': ['assets/less/bootstrap.less']
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'assets/dist/css/site.min.css': ['assets/less/bootstrap.less']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            bootstrap: {
                files: {
                    'assets/dist/js/app.min.js': ['<%= concat.bootstrap.dest %>']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '.'
                }
            }
        },
        watch: {
            // src: {
            //     files: '<%= jshint.src.src %>',
            //     tasks: ['jshint:src']
            // },
            options: {
                livereload: true
            },
            recess: {
                files: ['assets/less/*.less', 'assets/less/templates/*.less'],
                tasks: ['recess']
            },
            livereload: {
              files: ['*.html', '*.php', 'assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }            
        }
    });


    // These plugins provide necessary tasks.
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

    // Default task.
    grunt.registerTask('default', ['dist']);
};
