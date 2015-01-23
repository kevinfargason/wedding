/* jshint node: true */

module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		jqueryCheck: 'if (!jQuery) { throw new Error(\"Bootstrap requires jQuery\") }\n\n',

		concat: {
			options: {
				//banner: '//Underscore, jQuery, Backbone, and um Boostrap.',
				stripBanners: true
			},

			lib: {
				src: [
				'src/js/lib/jquery.js',  
				'src/js/lib/underscore.js',
				'src/js/lib/iscroll.js',
				'src/js/lib/smoothScroll.js',        
				'src/js/lib/jquery.fittext.js',
				'src/js/lib/jquery.stellar.js',
				'src/js/lib/jquery.validate.js',
				'src/js/lib/jquery.tablesorter.js',
				'src/js/lib/handlebars.js',
				'src/bootstrap/js/transition.js',
				// 'src/bootstrap/js/alert.js',
				'src/bootstrap/js/button.js',
				// 'src/bootstrap/js/carousel.js',
				'src/bootstrap/js/collapse.js',
				// 'src/bootstrap/js/dropdown.js',
				'src/bootstrap/js/modal.js',
				// 'src/bootstrap/js/tooltip.js',
				// 'src/bootstrap/js/popover.js',
				'src/bootstrap/js/scrollspy.js',
				// 'src/bootstrap/js/tab.js',
				// 'src/bootstrap/js/affix.js'
				],
				dest: 'dist/js/lib.js'
			},
			wedding: {
				src: [
				'src/js/app/handlebars.helpers.js',
				'src/js/app/wedding.bootstrap.js',
				'src/js/app/wedding.validation.js',
				'src/js/app/wedding.js',
				'src/js/app/wedding.RSVP.js', // RSVP cards
				'src/js/app/wedding.util.js',
				'src/js/app/wedding.admin.js'
				],
				dest: 'dist/js/wedding.js'
			}

		},

		uglify: {
			options: {
				mangle: false,
				compress: false,
				report: 'min',
				preserveComments: true,
				beautify: true
				//banner: '<%= banner %>'
			},
			lib: {
				src: ['<%= concat.lib.dest %>'],
				dest: 'dist/js/lib.min.js'
			},
			lib_min: {
				options: {
					mangle: true,
					compress: true,
					report: 'min',
					preserveComments: false,
					beautify: false
					//banner: '<%= banner %>'
				},
				src: ['<%= concat.lib.dest %>'],
				dest: 'dist/js/lib.min.js'
			},
			wedding: {
				src: ['<%= concat.lib.dest %>',
							'<%= concat.wedding.dest %>',
							'<%= handlebars.wedding.dest %>'
							],
				dest: 'dist/js/wedding.min.js'
			},
			wedding_min:{
				options: {
					mangle: true,
					compress: true,
					report: 'min',
					preserveComments: false,
					beautify: false
					//banner: '<%= banner %>'
				},
				src: ['<%= concat.lib.dest %>',
							'<%= concat.wedding.dest %>',
							'<%= handlebars.wedding.dest %>'],
				dest: 'dist/js/wedding.min.js'
			}
	},

	jshint: {
		options: {
			jshintrc: '.jshintrc'
		},
		gruntfile: {
			src: 'gruntfile.js'
		},
		app: {
			src: ['src/js/app/**/*.js']
		},
			// bootstrap: {
			//   src: ['src/bootstrap/js/*.js']
			// },
			test: {
				src: ['tests/**/*.js']
			}
		},

		recess: {
			options: {
				compile: true
			},
			wedding: {
				src: [
				'src/less/bootstrap.less',
				'src/less/wedding.less',
				'src/less/wedding-theme.less',
				'src/font-awesome-4.0.3/less/font-awesome.less'
				],
				dest: 'dist/css/<%= pkg.name %>.min.css'
			},
			wedding_min: {
				options: {
					compress: true
				},
				src: [
				'src/less/bootstrap.less',
				'src/less/wedding.less',
				'src/less/wedding-theme.less',
				'src/font-awesome-4.0.3/less/font-awesome.less'
				],
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		},

		autoprefixer: {
			wedding:{
				options:{
					diff: true
				},
				src: 'dist/css/<%= pkg.name %>.min.css'
			}
		},

		handlebars:{
			wedding:{
				options:{
					namespace: "Handlebars",
					processName: function(filePath) {
						var regex = new RegExp("/handlebars/"),
						path = filePath.substring(filePath.match(regex).index + 1, filePath.match('.hb').index),
							segments = path.split("/"); // ex. segments = ["handlebars, "ecommerce", "filenameWithoutExtension"]

							console.log(path, segments);
							return segments[1]; 
						}
					},
					src: [ 'src/js/handlebars/**/*.hb' ],
					dest: 'dist/js/handlebars.js'
				},

			},

			copy: {
				fonts: {
					flatten: true,
					expand: true,
					src: ['src/fonts/**', 'src/font-awesome-4.0.3/fonts/**'],
					dest: 'dist/fonts/'
				},
				audio:{
					flatten: true,
					expand: true,
					src: ['src/audio/**'],
					dest: 'dist/audio/'	
				}
			// img: {
			//   flatten: true,
			//   expand: true,
			//   src: ['src/img/**'],
			//   dest: 'dist/img/'
			// }
		},

		mocha: {
			all: {
				src: ['testrunner.html'],
			},
			options: {
				run: true
			}
		},

		// blanket_mocha: {
		// 	all: [ 'tests/testrunner.html' ],
		// 	options: {
		// 		threshold: 70
		// 	}
		// },

		blanket_mocha : {
			test: {
				src: ['testrunner.html'],
				options : {
					threshold : 60,
					globalThreshold : 65,
					log : true,
					logErrors: true
					// moduleThreshold : 60,
					// modulePattern : "./src/(.*?)/"
					// customThreshold: {
					// 	'./src/spelling/plurals.js': 50
					// }
				}
			}

		},


		'mocha-chai-sinon': {
			build: {
				src: ['tests/**/*.js'],
				options: {
					ui: 'bdd',
					reporter: 'spec'
				}
			}
		},

		watch: {
			src: {
				files: [
				'<%= jshint.app.src %>', 
				'src/less/**/*.less',
				'<%= handlebars.wedding.src %>',
				'page/**/*.*'
				],
				tasks: 'default',
				options: {
					livereload: true,
					spawn: false
				},
			}
		},

imagemin: {                          // Task
	dynamic: {   
			options: {                       // Target options
				optimizationLevel: 7,
				cache: false
			},                      // Another target
			files: [{
				expand: true,                  // Enable dynamic expansion
				cwd: 'src/img/',                // Src matches are relative to this path
				src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
				dest: 'dist/img/'               // Destination path prefix
			}]
		}
	},

	clean: {
		build: {
			src: ["dist"]
		}
	}

	}); // end initConfig


	grunt.loadTasks('node_modules/grunt-blanket-mocha/tasks');
	// Load dev dependencies
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) {
			grunt.loadNpmTasks(key);
		}
	}

	// JS distribution task.
	// grunt.registerTask('dist-js', ['concat', 'uglify']);
	// grunt.registerTask('dist-js-dev', ['concat:wedding', 'concat:lib', 'uglify:wedding', 'uglify:lib']);
	// CSS distribution task.
	// grunt.registerTask('dist-css', ['recess']);
	// grunt.registerTask('dist-css-dev', ['recess', 'autoprefixer']);
	
	//This if for Dev servers - just build, no code testing
	grunt.registerTask('dist-prod', ['recess:wedding_min', 'autoprefixer', 'handlebars', 'concat:wedding', 'concat:lib', 'uglify:wedding_min', 'uglify:lib']);
	grunt.registerTask('dist-dev',  ['recess:wedding', 'autoprefixer', 'handlebars', 'concat:wedding', 'concat:lib', 'uglify:wedding', 'uglify:lib']);

	grunt.registerTask('all', [ 'clean', 'handlebars', 'recess', 'concat', 'uglify', 'jshint', 'copy', 'imagemin']);
	grunt.registerTask('default', 'dev');//[ 'dist', 'jshint', 'copy']);

	grunt.registerTask('dev', ['jshint' , 'dist-dev']);
	grunt.registerTask('prod', ['clean', 'jshint' , 'dist-prod', 'copy', 'imagemin']);

	grunt.registerTask('test', ['blanket_mocha']);

}