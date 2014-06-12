'use strict';

var debug = require('debug')('express-pjaxify');
var utils = require('../utils');

module.exports = function(req, res, isPjax, options) {
  return function(view, locals, fn) {
    locals = locals || {};
    locals[options.isPjaxKey] = isPjax;
    view = isPjax ? utils.getPjaxView(view, options.pjaxViewFormat) : view;
    debug('strategy: view');
    debug('render view: %s', view);
    debug('view locals: %j', locals);
    res.render(view, locals, fn);
  };
};
