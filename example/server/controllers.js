'use strict';

var controllers = module.exports = {};

controllers.home = function(req, res) {
  res.pjax('home.html');
};

controllers.about = function(req, res) {
  res.pjax('about.html');
};
