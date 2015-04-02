'use strict';

var app = require('../app');
var request = require('supertest-as-promised');
var expect = require('chai').expect;
var fs = require('fs');
var nock = require('nock');

var sampleProfileHtml = fs.readFileSync('./test/assets/studentsample.html');

describe('App', function(){

  describe('POST /extract', function(){

    nock.enableNetConnect('127.0.0.1');
    nock('https://www.linkedin.com')
      .get('/in/studentsample')
      .reply(200, sampleProfileHtml);

    it('should work', function(){
     return request(app)
      .post('/extract')
      .send({ url: 'https://www.linkedin.com/in/studentsample' })
      .then(function(res){
        expect(res.body.formattedName).to.eql('Student Sample');
      });
    });

  });

});