(function($) {
    $('.ui-accordion-header').click(function () {
      $(this).parent().find('.ui-accordion-content').addClass('folded');
      $(this).next().removeClass('folded');
    });


})(jQuery);
