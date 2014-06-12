'use strict';

var _     = require('lodash');
var debug = require('debug')('express-pjaxify');
var utils = require('../utils');

module.exports = function(req, res, isPjax, options) {
  return function(view, locals, fn) {
    var isPjaxKey      = options.isPjaxKey;
    var layoutKey      = options.layoutKey;
    var defaultLayout  = options.defaultLayout;
    var pjaxViewFormat = options.pjaxViewFormat;
    var layout         = _.has(locals, layoutKey) ? locals[layoutKey] : defaultLayout;
    locals             = locals || {};
    locals[isPjaxKey]  = isPjax;
    locals[layoutKey]  = isPjax ? utils.getPjaxView(layout, pjaxViewFormat) : layout;
    debug('strategy: layout');
    debug('render view: %s', view);
    debug('view locals: %j', locals);
    res.render(view, locals, fn);
  };
};
