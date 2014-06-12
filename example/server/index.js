'use strict';

var path     = require('path');
var express  = require('express');
var chalk    = require('chalk');
var nunjucks = require('nunjucks');
var routes   = require('./routes');
var pjaxify  = require('../../');

var PORT = process.env.NODE_PORT || 3000;
var ROOT = path.join(__dirname, '..');

var app = module.exports = express();

nunjucks.configure(path.join(ROOT, 'server', 'views'), {express: app});

app
  .use(pjaxify(app))
  .use(express.static(path.join(ROOT, 'bower_components')))
  .use(express.static(path.join(ROOT, 'client')))
  .use(routes);

app.listen(PORT, function() {
  console.log(chalk.magenta('Server listening on port %d...'), PORT);
});
