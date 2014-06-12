'use strict';

var _         = require('lodash');
var validator = require('./validator');

module.exports = function(options) {

  options = _.defaults(options || {}, {
    strategy       : 'layout',
    pjaxHeader     : 'X-PJAX',
    isPjaxKey      : 'isPjax',
    layoutKey      : 'layout',
    pjaxViewFormat : '{name}.pjax{ext}',
    renderName     : 'pjax'
  });

  validator.validate(options);

  return function(req, res, next) {
    var isPjax = req[options.isPjaxKey] = req.header(options.pjaxHeader) ? true : false;
    res[options.renderName] = require('./strategies/' + options.strategy)(req, res, isPjax, options);
    next();
  };
};
