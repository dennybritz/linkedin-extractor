'use strict';

var app = require('../app');
var request = require('supertest-as-promised');
var expect = require('chai').expect;

describe('App', function(){

  describe('POST /extract', function(){

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