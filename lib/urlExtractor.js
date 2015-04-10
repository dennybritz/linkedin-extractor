'use strict';

var Promise = require('bluebird');
var request = require('superagent');
var ProfileParser = require('./profileParser');

var Extractor = function(){};

Extractor.prototype.getFromUrl = function(url, callback) {
  request
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36')
    .set('Host', 'www.linkedin.com')
    .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
    .set('Accept-Encoding', 'gzip, deflate, sdch')
    .set('Accept-Language', 'en-US,en;q=0.8,de;q=0.6,ja;q=0.4,ko;q=0.2,vi;q=0.2')
    .get(url)
    .redirects(10)
    .end(function(err, res){
      if(err) { return callback(err, null); }
      var parser = new ProfileParser(res.text);
      callback(null, parser.parse());
    });
};

Promise.promisifyAll(Extractor.prototype);

module.exports = new Extractor();