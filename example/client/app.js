(function($) {

  'use strict';

  $(function() {
    $(document).pjax('[data-pjax] a, a[data-pjax]', '#content');
  });

})(jQuery);
