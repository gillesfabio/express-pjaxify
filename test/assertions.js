'use strict';

function isPjax(res) {
  if (res.text.indexOf('<p>pjax</p>') === -1) throw new Error('is not pjax');
}

function isntPjax(res) {
  if (res.text.indexOf('<p>no-pjax</p>') === -1) throw new Error('is pjax');
}

module.exports = {
  isPjax   : isPjax,
  isntPjax : isntPjax
};
