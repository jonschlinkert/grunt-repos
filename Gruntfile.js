/*
 * grunt-repos
 * https://github.com/assemble/grunt-repos
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Pull down a list of repos from Github.
    repos: {
      namespaced: {
        options: {
          username: 'assemble',
          namespace: 'foo'
        },
        files: {
          'test/actual/namespaced.json': ['repos?page=1&per_page=100']
        }
      },
      no_namespace: {
        options: {
          username: 'assemble',
          namespace: false
        },
        files: {
          'test/actual/no_namespace.json': ['repos?page=1&per_page=100']
        }
      },
      included: {
        options: {
          username: 'assemble',
          include: ['contrib', 'boilerplate'],
        },
        files: {
          'test/actual/included.json': ['repos?page=1&per_page=100']
        }
      },
      excluded: {
        options: {
          username: 'assemble',
          exclude: ['contrib', 'boilerplate'],
        },
        files: {
          'test/actual/excluded.json': ['repos?page=1&per_page=100']
        }
      },
      multiple_opts: {
        options: {
          username: 'assemble',
          namespace: 'foo',
          include: ['contrib', 'boilerplate'],
          exclude: ['rss', 'toc'],
        },
        files: {
          'test/actual/multiple_opts.json': ['repos?page=1&per_page=100']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'readme']);
};
