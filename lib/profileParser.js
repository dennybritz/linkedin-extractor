'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');
var url = require('url');

var ProfileParser = function(html){
  this.html = html;
  this.$ = cheerio.load(html);
  this.$profile = this.$('#profile');
};

ProfileParser.prototype.parse = function() {
  var result = {};
  _.assign(result, this.getBasicProfile());
  _.assign(result, {
    experience: this.getExperience(),
    skills: this.getSkills(),
    urlResources: this.getUrlResources()
  });
  return result;
};

ProfileParser.prototype.getBasicProfile = function(){
  var $ = this.$profile;
  // TODO: What exactly is the Linkedin ID?
  var id = null;
  var formattedName = $.find('.full-name').text();
  var headline = $.find('#headline').text();
  var location = $.find('#location .locality').text();
  var industry = $.find('#location .industry').text();
  var numConnections = $.find('.member-connections').text();
  numConnections = (numConnections === '500+') ? 500 : parseInt(numConnections);
  var summary = $.find('#background #background-summary .summary').text();
  var pictureUrl = $.find('.profile-picture img').attr('src');
  var publicProfileUrl = this.$('link[rel=canonical]').attr('href');

  return _.omit({
    id: id,
    formattedName: formattedName,
    headline: headline,
    location: location,
    industry: industry,
    numConnections: numConnections,
    summary: summary,
    pictureUrl: pictureUrl,
    publicProfileUrl: publicProfileUrl
  }, _.isNull);
};

ProfileParser.prototype.getExperience = function() {
  var $ = this.$;
  var experienceItems = this.$profile.find('#background-experience-container .section-item');
  return experienceItems.map(function(i, element){
    var $ex = $(element);
    var id = $ex.attr('id');
    var title = $ex.find('h4').text();
    var company = $ex.find('h5').text();
    var summary = $ex.find('.description').text();
    var isCurrent = $ex.hasClass('current-position');
    var startDate = $ex.find('.experience-date-locale time').eq(0).text();
    var endDate = isCurrent ? null : $ex.find('.experience-date-locale time').eq(1).text();
    var location = $ex.find('.locality').text();
    return _.omit({
      id: id,
      title: title,
      company: company,
      summary: summary,
      isCurrent: isCurrent,
      startDate: startDate,
      endDate: endDate,
      location: location
    }, _.isNull);
  }).get();
};

ProfileParser.prototype.getSkills = function() {
  var $ = this.$;
  var skillsItems = this.$profile.find('#skills-item ul li');
  return skillsItems.map(function(i, element){
    return {
      skill: $(element).text()
    };
  }).get();
};

ProfileParser.prototype.getSkills = function() {
  var $ = this.$;
  var skillsItems = this.$profile.find('#skills-item ul li');
  return skillsItems.map(function(i, element){
    return {
      skill: $(element).text()
    };
  }).get();
};

ProfileParser.prototype.getUrlResources = function() {
  var $ = this.$;
  var items = this.$profile.find('#overview-summary-websites ul li a');
  return items.map(function(i, element){
    var $a = $(element);
    var parsedUrl = url.parse($a.attr('href'), true);
    return {
      name: $a.text(),
      url: parsedUrl.query.url
    };
  }).get();
};


module.exports = ProfileParser;

