/* jshint expr:true */
/* global describe:true, it:true */
'use strict';

var chai      = require('chai');
var expect    = chai.expect;
var validator = require('../../lib/validator');

describe('validator', function() {

  describe('validate()', function() {

    it('should validate strategy option', function() {
      expect(validator.validate.bind(null, {strategy: 'view'})).to.not.throw();
      expect(validator.validate.bind(null, {strategy: 'unknwo'})).to.throw();
    });

    it('should validate pjaxHeader option', function() {
      expect(validator.validate.bind(null, {pjaxHeader: 'X-CUSTOM-PJAX'})).to.not.throw();
      expect(validator.validate.bind(null, {pjaxHeader: 123})).to.throw();
    });

    it('should validate isPjaxKey option', function() {
      expect(validator.validate.bind(null, {isPjaxKey: 'pjax'})).to.not.throw();
      expect(validator.validate.bind(null, {isPjaxKey: 123})).to.throw();
    });

    it('should validate layoutKey option', function() {
      expect(validator.validate.bind(null, {layoutKey: 'layooooout'})).to.not.throw();
      expect(validator.validate.bind(null, {layoutKey: 123})).to.throw();
    });

    it('should validate defaultLayout option', function() {
      expect(validator.validate.bind(null, {defaultLayout: 'layout.html'})).to.not.throw();
      expect(validator.validate.bind(null, {defaultLayout: 123})).to.throw();
    });

    it('should validate pjaxViewFormat', function() {
      expect(validator.validate.bind(null, {pjaxViewFormat: '{name}.view{ext}'})).to.not.throw();
      expect(validator.validate.bind(null, {pjaxViewFormat: 'view'})).to.throw();
      expect(validator.validate.bind(null, {pjaxViewFormat: 'view{ext}'})).to.throw();
      expect(validator.validate.bind(null, {pjaxViewFormat: '{foobar}view{ext}'})).to.throw();
    });

    it('should validate renderName option', function() {
      expect(validator.validate.bind(null, {renderName: 'renderPjax'})).to.not.throw();
      expect(validator.validate.bind(null, {renderName: 123})).to.throw();
    });

  });

});
