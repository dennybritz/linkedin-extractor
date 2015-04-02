'use strict';

var Promise = require('bluebird');
var request = require('superagent');
var ProfileParser = require('./profileParser');

var Extractor = function(){};

Extractor.prototype.getFromUrl = function(url, callback) {
  request
    .get(url)
    .end(function(err, res){
      if(err) { return callback(err, null); }
      var parser = new ProfileParser(res.text);
      callback(null, parser.parse());
    });
};

Promise.promisifyAll(Extractor.prototype);

module.exports = new Extractor();