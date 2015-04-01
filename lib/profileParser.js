'use strict';

var _ = require('underscore');
var cheerio = require('cheerio');

var ProfileParser = function(html){
  this.html = html;
  this.$ = cheerio.load(html);
  this.$profile = this.$('#profile');
};

ProfileParser.prototype.get = function() {
  var result = {};
  _.extend(result, this.getBasicProfile());
  _.extend(result, {
    experience: this.getExperience()
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
  // TODO: Format line breaks?
  var summary = $.find('#background #background-summary .summary').text();
  // TODO: Positions?
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
  });
};

module.exports = ProfileParser;

