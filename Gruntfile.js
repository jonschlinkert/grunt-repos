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
          path: '/orgs/assemble/',
          namespace: 'foo'
        },
        files: {
          'test/actual/namespaced.json': ['repos?page=1&per_page=100']
        }
      },
      whitelisted: {
        options: {
          path: '/orgs/assemble/',
          whitelist: ['contrib', 'boilerplate'],
        },
        files: {
          'test/actual/whitelisted.json': ['repos?page=1&per_page=100']
        }
      },
      blacklisted: {
        options: {
          path: '/orgs/assemble/',
          blacklist: ['contrib', 'boilerplate'],
        },
        files: {
          'test/actual/blacklisted.json': ['repos?page=1&per_page=100']
        }
      },
      multiple_opts: {
        options: {
          path: '/orgs/assemble/',
          namespace: 'foo',
          whitelist: ['contrib', 'boilerplate'],
          blacklist: ['rss', 'toc'],
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
  grunt.registerTask('default', ['jshint', 'repos']);
};
