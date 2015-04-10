'use strict';

var Promise = require('bluebird');
var request = require('superagent');
var ProfileParser = require('./profileParser');

var Extractor = function(){};

Extractor.prototype.getFromUrl = function(url, callback) {
  request
    .get(url)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36')
    .set('Host', 'www.linkedin.com')
    .redirects(10)
    .end(function(err, res){
      if(err) { return callback(err, null); }
      var parser = new ProfileParser(res.text);
      callback(null, parser.parse());
    });
};

Promise.promisifyAll(Extractor.prototype);

module.exports = new Extractor();