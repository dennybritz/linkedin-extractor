'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var request = require('superagent').agent();
var ProfileParser = require('./profileParser');
var cheerio = require('cheerio');

var Extractor = function(){};

Extractor.prototype.login = function(email, password, callback) {
  this.getLoginFormDataAsync().then(function(formFields){
    return request
      .post('https://www.linkedin.com/uas/login-submit')
      .type('form')
      .send(formFields)
      .send({ session_key: email, session_password: password })
      .end(callback);
  });
};

Extractor.prototype.getLoginFormData = function(callback) {
  request
    .get('https://www.linkedin.com/uas/login')
    .end(function(err, res){
      if(err) { return callback(err, null); }
      var $ = cheerio.load(res.text);
      var formFields = $('form[name=login] input[type=hidden]').map(function(i, element){
        var input = $(element);
        return [[input.attr('name'), input.attr('value')]];
      }).get();
      callback(null, _.zipObject(formFields));
    });
};

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