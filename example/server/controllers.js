'use strict';

var controllers = module.exports = {};

controllers.home = function(req, res) {
  res.pjax('home.html', {layout: 'layout.html'});
};

controllers.about = function(req, res) {
  res.pjax('about.html', {layout: 'layout.html'});
};
