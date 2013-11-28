/*!
 * repos
 * http://github.com/jonschlinkert/grunt-repos
 *
 * Copyright 2013 Jon Schlinkert
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */

'use strict';

// Node.js
var fs    = require('fs');
var https = require('https');
var path  = require('path');
var util  = require('util');

// node_modules
var async = require('async');
var _     = require('lodash');


module.exports = function(grunt) {

  grunt.registerMultiTask('repos', "Download a list of repos from GitHub's API.", function() {
    var done = this.async();

    var options = this.options({
      append: '',
      sortBy: 'name',
      sortOrder: 'asc',
      host: 'api.github.com',
      method: 'GET',
      path: '/orgs/assemble/',
      headers: {'User-Agent': 'grunt-repos'}
    });

    var id     = process.env.CLIENT_ID     || '';
    var secret = process.env.CLIENT_SECRET || '';
    var oauth  = process.env.OAUTH_TOKEN   || '';

    // If CLIENT_ID and CLIENT_SECRET are variables on process.env,
    // use then to append the path with auth information
    if(options.append.length > 0 && oauth) {
      options.append = '?access_token=' + oauth;
    } else if(options.append.length > 0 && id && secret) {
      options.append = '?client_id=' + id + '&client_secret=' + secret;
    }

    options.whitelist  = options.whitelist  || [];
    options.blacklist  = options.blacklist  || [];
    options.namespace  = options.namespace  || 'repos';

    /**
     * Accepts two objects (a, b),
     * @param  {Object} a
     * @param  {Object} b
     * @return {Number} returns 1 if (a >= b), otherwise -1
     */
    var compareFn = function (a, b) {
      a = a[options.sortBy];
      b = b[options.sortBy];
      var result = 0;
      if (a === b) {
        result = 0;
      } else if (a > b) {
        result = 1;
      } else {
        result = -1;
      }
      if(options.sortOrder.toLowerCase() === 'desc') {
        return result * -1;
      }
      return result;
    };

    async.forEach(this.files, function(fp, cb) {
      async.forEach(fp.orig.src, function (src, callback) {

        var srcPath = src || 'repos?page=1&per_page=100';
        options.path = String(options.path + src + options.append);

        var request = https.get(options, function (response) {
          grunt.verbose.writeln('response:'.yellow, response);

          var body = '';
          response.on('data', function (chunk) {
            body += chunk;
          });

          response.on('end', function () {
            var json = JSON.parse(body);
            var repos = [];

            Object.keys(json).map(function (key) {
              var repo = json[key];
              if(whitelisted(options.whitelist, repo, 'name')) {
                if(notBlacklisted(options.blacklist, repo, 'name')) {
                  repo.fullname = repo.full_name;
                  repo.url      = repo.html_url;
                  repo.download = repo.html_url + '/archive/master.zip';
                  return repo;
                }
              }
            }).sort(compareFn).map(function(obj) {
              repos.push(obj);
            });

            var reposObj = {};
            if(options.namespace) {
              reposObj[options.namespace] = _.compact(repos);
            } else {
              reposObj = _.compact(repos);
            }

            grunt.verbose.ok('repos:'.yellow, JSON.stringify(reposObj, null, 2));
            grunt.log.ok('Saved to:'.green, fp.dest);

            grunt.file.write(fp.dest, JSON.stringify(reposObj, null, 2));
            callback(null);
          });
        });
        request.on('error', function (e) {
          console.error(e);
        });
      }, function () {
        cb(null);
      });
    }, function () {
      done();
    });
  });

  var whitelisted = function (keywords, obj, prop) {
    keywords = Array.isArray(keywords) ? keywords : [keywords];
    keywords = (keywords.length > 0) ? keywords.join('|') : '.*';
    var re = new RegExp('(?:' + keywords + ')', 'g');
    if (obj[prop].match(re)) {
      return true;
    } else {
      return false;
    }
  };

  var notBlacklisted = function (keywords, obj, prop) {
    keywords = Array.isArray(keywords) ? keywords : [keywords];
    if(keywords.length > 0) {
      keywords = keywords.join('|');
    } else {
      return true;
    }
    var re = new RegExp('(?:' + keywords + ')', 'g');
    if (obj[prop].match(re)) {
      return false;
    } else {
      return true;
    }
  };
};