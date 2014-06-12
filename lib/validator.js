'use strict';

var util   = require('util');
var _      = require('lodash');

var checkers = {

  _checkString: function(key, value) {
    if (!_.isString(value)) throw new Error(util.format('%s option must be a string', key));
  },

  strategy: function(value) {
    if (!_.contains(['layout', 'view'], value)) throw new Error('Unknown strategy: ' + value);
  },

  pjaxHeader: function(value) {
    this._checkString('pjaxHeader', value);
  },

  isPjaxKey: function(value) {
    this._checkString('isPjaxKey', value);
  },

  layoutKey: function(value) {
    this._checkString('layoutKey', value);
  },

  defaultLayout: function(value) {
    this._checkString('defaultLayout', value);
  },

  pjaxViewFormat: function(value) {
    ['{name}', '{ext}'].forEach(function(required) {
      if (!_.contains(value, required)) {
        throw new Error('Wrong pjaxViewFormat: missing {name} and/or {ext}');
      }
    });
  },

  renderName: function(value) {
    this._checkString('renderName', value);
  }
};

function validate(options) {
  Object.keys(options).forEach(function(option) {
    if (_.has(checkers, option)) checkers[option](options[option]);
  });
}

module.exports = {
  checkers : checkers,
  validate : validate
};
