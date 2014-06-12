'use strict';

var _     = require('lodash');
var debug = require('debug')('express-pjaxify');
var utils = require('../utils');

module.exports = function(req, res, isPjax, options) {
  return function(view, locals, fn) {
    locals = locals || {};
    locals[options.isPjaxKey] = isPjax;
    if (_.has(locals, options.layoutKey)) {
      var layout = locals[options.layoutKey];
      locals[options.layoutKey] = isPjax ? utils.getPjaxView(layout, options.pjaxViewFormat) : layout;
    }
    debug('strategy: layout');
    debug('render view: %s', view);
    debug('view locals: %j', locals);
    res.render(view, locals, fn);
  };
};
