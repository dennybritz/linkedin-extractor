'use strict';

var urlExtractor = require('../lib/urlExtractor');
var expect = require('chai').expect;
var fs = require('fs');
var nock = require('nock');

var sampleProfileHtml = fs.readFileSync('./test/assets/studentsample.html');

describe('URL Extractor', function(){

  describe('#getLoginFormData', function(){

    it('should return an object with the form fields on the page', function(){

      nock('https://www.linkedin.com')
        .get('/uas/login')
        .replyWithFile(200, 'test/assets/login.html');

      return urlExtractor.getLoginFormDataAsync().then(function(data){
        expect(data).to.eql({
          clickedSuggestion: 'false',
          csrfToken: 'ajax:2827148202268307420',
          fromEmail: '',
          isJsEnabled: 'false',
          loginCsrfParam: 'a20b1228-8cdc-41b8-8798-3fae25a397a9',
          session_redirect: '',
          sourceAlias: '0_7r5yezRXCiA_H0CRD8sf6DhOjTKUNps5xGTqeX8EEoi',
          source_app: '',
          trk: '',
          tryCount: ''
        });
      });

    });

  });

  it('should return a Linkedin profile from a URL', function(){

    nock('https://www.linkedin.com')
      .get('/in/studentsample')
      .reply(200, sampleProfileHtml);

    return urlExtractor
      .getFromUrlAsync('https://www.linkedin.com/in/studentsample')
      .then(function(res){
        expect(res.formattedName).to.eql('Student Sample');
      });

  });

});
