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
    urlResources: this.getUrlResources(),
    education: this.getEducation()
  });
  return result;
};

ProfileParser.prototype.getBasicProfile = function(){
  var $ = this.$profile;
  // TODO: What exactly is the Linkedin ID?
  var id = null;
  var formattedName = $.find('.full-name').text().trim();
  var headline = $.find('#headline').text().trim();
  var location = $.find('#location .locality').text().trim();
  var industry = $.find('#location .industry').text().trim();
  var numConnections = $.find('.member-connections').text().trim();
  numConnections = (numConnections === '500+') ? 500 : parseInt(numConnections);
  var summary = $.find('#background #background-summary .summary').text().trim();
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
    var id = $ex.attr('id').match(/\d+/)[0];
    var title = $ex.find('h4').text().trim();
    var company = $ex.find('h5').text().trim();
    var summary = $ex.find('.description').text().trim();
    var isCurrent = $ex.hasClass('current-position');
    var startDate = $ex.find('.experience-date-locale time').eq(0).text().trim();
    var endDate = isCurrent ? null : $ex.find('.experience-date-locale time').eq(1).text().trim();
    var location = $ex.find('.locality').text().trim();
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
  var skillsItems = this.$profile.find('#skills-item ul li .endorse-item-name');
  return skillsItems.map(function(i, element){
    return {
      skill: $(element).text().trim()
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
      name: $a.text().trim(),
      url: parsedUrl.query.url
    };
  }).get();
};

ProfileParser.prototype.getEducation = function() {
  var $ = this.$;
  var items = this.$profile.find('#background-education .section-item');
  return items.map(function(i, element){
    var $div = $(element);
    var educationId =  $div.attr('id').match(/\d+/)[0];
    var schoolName = $div.find('header h4.summary').text().trim();
    var degree = ($div.find('.degree').text().match(/(.*?)(?:,\s)?$/)|| [])[1];
    var fieldOfStudy = $div.find('.major').text().trim();
    var startYear = ($div.find('.education-date time').eq(0).text().match(/\d+/) || [])[0];
    startYear = startYear ? parseInt(startYear) : null;
    var endYear = ($div.find('.education-date time').eq(1).text().match(/\d+/) || [])[0];
    endYear = endYear ? parseInt(endYear) : null;
    var activities = $div.find('.activities').text().trim();
    var notes = $div.find('.notes').text().trim();
    var grade = ($div.find('.grade').text().match(/(?:,\s)?(.*)$/) || [])[1];
    var result = {
      id: educationId,
      schoolName: schoolName,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
      grade: grade,
      startDate: startYear ? { year: startYear} : undefined,
      endDate: endYear ? { year: endYear } : undefined,
      activities: activities,
      notes: notes
    };
    return _.pick(result, _.identity);
  }).get();
};


module.exports = ProfileParser;

