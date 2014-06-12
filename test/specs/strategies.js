/* jshint expr:true */
/* global describe:true, it:true, beforeEach:true */
'use strict';

var path       = require('path');
var express    = require('express');
var request    = require('supertest');
var nunjucks   = require('nunjucks');
var assertions = require('../assertions');
var pjaxify    = require('../../');

var VIEWS = path.join(__dirname, '..', 'fixtures', 'views');

describe('strategies', function() {

  var app;
  var nunjucksEnv;

  describe('layout', function() {

    beforeEach(function() {
      app = express();
      nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(VIEWS, 'layout')));
      nunjucksEnv.express(app);
      app.use(pjaxify({strategy: 'layout'}));
      app.get('/', function(req, res) { res.pjax('home.html', {layout: 'layout.html'}); });
    });

    it('should render regular view', function(done) {
      request(app)
        .get('/')
        .expect(assertions.isntPjax)
        .end(function(err) {
          done(err);
        });
    });

    it('should render pjax view', function(done) {
      request(app)
        .get('/')
        .set('X-PJAX', true)
        .expect(assertions.isPjax)
        .end(function(err) {
          done(err);
        });
    });
  });

  describe('view', function() {

    beforeEach(function() {
      app = express();
      nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(VIEWS, 'view')));
      nunjucksEnv.express(app);
      app.use(pjaxify({strategy: 'view'}));
      app.get('/', function(req, res) { res.pjax('home.html'); });
    });

    it('should render regular view', function(done) {
      request(app)
        .get('/')
        .expect(assertions.isntPjax)
        .end(function(err) {
          done(err);
        });
    });

    it('should render pjax view', function(done) {
      request(app)
        .get('/')
        .set('X-PJAX', true)
        .expect(assertions.isPjax)
        .end(function(err) {
          done(err);
        });
    });
  });

});
