/* jshint expr:true */
/* global describe:true, it:true */
'use strict';

var chai        = require('chai');
var expect      = chai.expect;
var getPjaxView = require('../../lib/utils').getPjaxView;

describe('utils', function() {

  describe('getPjaxView()', function() {

    it('should determine pjax view', function() {
      expect(getPjaxView('layout.html', '{name}.pjax{ext}')).to.equal('layout.pjax.html');
      expect(getPjaxView('base.html', '{name}.pjax{ext}')).to.equal('base.pjax.html');
      expect(getPjaxView('awesome-layout.html', '{name}-pjaxify{ext}')).to.equal('awesome-layout-pjaxify.html');
      expect(getPjaxView('awesome-layout.jade', '{name}-pjaxify{ext}')).to.equal('awesome-layout-pjaxify.jade');
    });

    it('should determine pjax view without extension', function() {
      expect(getPjaxView('layout', '{name}.pjax{ext}')).to.equal('layout.pjax');
    });

    it('should determine pjax view with relative path', function() {
      expect(getPjaxView('../../layout.html', '{name}.pjax{ext}')).to.equal('../../layout.pjax.html');
    });

    it('should determine pjax view with absolute path', function() {
      expect(getPjaxView('/path/to/layout.html', '{name}-pjax{ext}')).to.equal('/path/to/layout-pjax.html');
    });
  });
});
