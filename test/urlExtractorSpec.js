'use strict';

var urlExtractor = require('../lib/urlExtractor');
var expect = require('chai').expect;
var fs = require('fs');
var nock = require('nock');

var sampleProfileHtml = fs.readFileSync('./test/assets/studentsample.html');

describe('URL Extractor', function(){

  it('should return a Linkedin profile from a URL', function(){

    nock('https://www.linkedin.com')
      .get('/in/studentsample')
      .reply(200, sampleProfileHtml)

    return urlExtractor
      .getFromUrlAsync('https://www.linkedin.com/in/studentsample')
      .then(function(res){
        expect(res.formattedName).to.eql('Student Sample');
      });

  });

});
