'use strict';

var urlExtractor = require('../lib/urlExtractor');
var express = require('express');
var log = require('blikk-logjs')('routes');

var router = express.Router();

router.post('/extract', function(req, res){
  if(!req.body.url){
    log.warn({req: req}, 'request without url');
    return res.status(400).send('You must specify a URL.');
  }
  log.info({url: req.body.url}, 'processing request');
  urlExtractor.getFromUrlAsync(req.body.url)
    .then(function(result){
    res.send(result);
  }).catch(function(err){
    log.error({err: err, url: req.body.url}, 'request failed');
    res.sendStatus(404);
  });
});

module.exports = router;