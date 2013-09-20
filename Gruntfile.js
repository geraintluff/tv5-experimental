module.exports = function (grunt) {
	'use strict';

	var path = require('path');
	var util = require('util');

	require('source-map-support').install();

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-component');
	grunt.loadNpmTasks('grunt-push-release');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		push: {
			options: {
				updateConfigs: ['pkg'],
				files: ['package.json', 'component.json', 'bower.json'],
				add: false,
				addFiles: [],
				commit: false,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['-a'],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'origin',
				npm: false,
				npmTag: 'Release v%VERSION%',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		},
		copy: {
			test_deps: {
				expand: true,
				flatten: true,
				src: ['node_modules/mocha/mocha.js', 'node_modules/mocha/mocha.css', 'node_modules/proclaim/proclaim.js'],
				dest: 'test/deps'
			}
		},
		clean: {
			tests: ['tmp', 'test/all_concat.js'],
			build: ['tv5.js', 'tv5.min.js', '*js.map', 'test/all_concat.js', 'test/all_concat.js.map']
		},
		jshint: {
			//lint for mistakes
			options:{
				reporter: './node_modules/jshint-path-reporter',
				jshintrc: '.jshintrc'
			},
			tests: ['test/tests/**/*.js', 'test/all_*.js'],
			output: ['./tv5.js']
		},
		concat_sourcemap: {
			options: {
				separator: '\n'
			},
			source: {
				expand: true,
				cwd: 'source',
				rename: function (dest, src) {
					return dest;
				},
				src: [
					'../LICENSE.txt',
					'_header.js',
					'_polyfill.js',
					'validate.js',
					'basic.js',
					'numeric.js',
					'string.js',
					'array.js',
					'object.js',
					'combinations.js',
					'resolve-uri.js',
					'relative-json-pointer.js',
					'normalise-schema.js',
					'api.js',
					'_footer.js'
				],
				dest: 'tv5.js'
			},
			tests: {
				src: ['test/_header.js', 'test/tests/**/*.js'],
				dest: 'test/all_concat.js'
			}
		},
		component: {
			build: {
				options: {
					action: 'build', // can be omitted (build = default)
					args: {
						//standalone: '$',
						dev: true
					}
				}
			}
		},
		uglify: {
			tv5: {
				options: {
					report: 'min',
					sourceMapIn: 'tv5.js.map',
					sourceMap: 'tv5.min.js.map'
				},
				files: {
					'tv5.min.js': ['tv5.js']
				}
			}
		},
		mochaTest: {
			//node-side
			any: {
				src: ['test/all_concat.js'],
				options: {
					reporter: 'mocha-unfunk-reporter',
					bail: false
				}
			}
		},
		mocha: {
			//browser-side
			any: {
				src: ['test/index*.html'],
				options: {
					reporter: 'Dot',
					log: true,
					run: true
				}
			}
		},
		markdown: {
			index: {
				options: {
					template: 'doc/_template.html',
					markdownOptions: {
						gfm: true,
						highlight: false
					}
				},
				src: 'README.md',
				dest: 'index.html'
			}
		}
	});

	// main cli commands
	grunt.registerTask('default', ['test']);
	grunt.registerTask('products', ['uglify:tv5', 'component:build', 'markdown']);
	grunt.registerTask('build', ['clean', 'concat_sourcemap', 'jshint', 'products', 'copy:test_deps']);
	grunt.registerTask('test', ['build', 'mochaTest', 'mocha']);

	grunt.registerTask('dev', ['clean', 'concat_sourcemap', 'jshint', 'mochaTest']);
};
