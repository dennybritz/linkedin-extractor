'use strict';

var urlExtractor = require('../lib/urlExtractor');
var expect = require('chai').expect;

describe('URL Extractor', function(){

  it('should return a Linkedin profile from a URL', function(){

    return urlExtractor
      .getFromUrlAsync('https://www.linkedin.com/in/dennybritz')
      .then(function(res){
        expect(res.formattedName).to.eql('Denny Britz');
      });

  });

});
