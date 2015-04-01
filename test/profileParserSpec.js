'use strict';

var ProfileParser = require('../lib/profileParser');
var fs = require('fs');
var expect = require('chai').expect;

var sampleProfileHtml = fs.readFileSync('./test/assets/studentsample.html')
var pp = new ProfileParser(sampleProfileHtml);

describe('Linkedin Profile Parser', function(){

  describe('#getBasicProfile', function(){

    it('shoud work', function(){
      var profile = pp.getBasicProfile();
      expect(profile.formattedName).to.eql('Student Sample');
      expect(profile.headline).to.eql('Social Media Branding Specialist | Seeking Marketing Internship');
      expect(profile.location).to.eql('Greater Los Angeles Area');
      expect(profile.industry).to.eql('Marketing and Advertising');
      expect(profile.numConnections).to.eql(6);
      expect(profile.summary).to.eql(
        'SAMPLE STUDENT\n\n' + 
        'A second year Business Administration undergraduate student at UC Riverside with an interest in marketing, ' +
        'advertising, and social media. Seeking a summer internship to apply my experience assisting a company’s ' + 
        'branding needs through social media outreach, developing marketing plans, digital marketing, and ' +
        'conducting customer research.\n\n' + 
        'Specialties\n' +
        '•Event planning\n' +
        '•Social networking and marketing \n'+ 
        '•Account management\n' + 
        '• Microsoft Offices (Word, PowerPoint, Excel)\n' +
        '• Adobe CS5.5 Suite (Photoshop, Flash)');
      expect(profile.pictureUrl).to.eql('https://media.licdn.com/media/p/4/000/15e/3ac/174b560.jpg');
      expect(profile.publicProfileUrl).to.eql('https://www.linkedin.com/in/studentsample');
    });

  });

  describe('#getExperience', function(){

    it('should work', function(){
      var experiences = pp.getExperience();
      expect(experiences.length).to.eql(3);
      expect(experiences[0].id).to.eql('experience-278792035');
      expect(experiences[0].title).to.eql('Advertising Account Executive');
      expect(experiences[0].company).to.eql('The Highlander Newspaper');
      expect(experiences[0].summary).to.eql('•Manage more than 100 clients and their advertising needs.\n' + 
        '•Design advertising campaigns and marketing related plans utilizing AdPro software.\n' + 
        '•Create and work with designers using Adobe software to develop effective advertisements.\n' + 
        '•Raise approximately $3,000 in advertising revenue each month.');
      expect(experiences[0].isCurrent).to.eql(true);
      expect(experiences[0].startDate).to.eql('October 2011');
      expect(experiences[0].endDate).to.be.undefined;
      expect(experiences[0].location).to.eql('UC Riverside');

      expect(experiences[1].startDate).to.eql('June 2010');
      expect(experiences[1].endDate).to.eql('September 2011');
      expect(experiences[1].isCurrent).to.eql(false);

    });

  });

});