'use strict';

var util = require('util');
var path = require('path');

function getPjaxView(view, format) {
  var dirname  = path.dirname(view);
  var ext      = path.extname(view);
  var name     = path.basename(view, ext);
  var filename = format.replace('{name}', name).replace('{ext}', ext);
  return path.normalize(util.format('%s/%s', dirname, filename));
}

module.exports = {
  getPjaxView: getPjaxView
};
