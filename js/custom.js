(function($) {
    $('.ui-accordion-header').click(function () {
      $(this).parent().find('.ui-accordion-content').addClass('folded');
      $(this).next().removeClass('folded');
    });

    var HelloWorldDevs = function() {};

    HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
       var $form = $(form);
       $form.submit(function(e) {
         e.preventDefault();
         var formData = $form.serialize();
         var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule'
         $('.form-error').remove();
         $.ajax({
           type: 'POST',
           url: formAction,
           data: formData,
           dataType: 'json',
           encode: true
         }).done(function (response) {
           $form.replaceWith($(success_msg).html());
         }).error(function (response) {
           var $error_list = $('<ul>');
           if(response.responseJSON == undefined) {
             $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
           } else {
             $.each(response.responseJSON, function(key, value) {
               $error_list.append($('<li>').text(value));
             });
           }
           $form.before('<div class="form-error"></div>');
           $('.form-error').html($error_list).fadeIn();
         });
       });
     };
     var HWD = new HelloWorldDevs();
     HWD.mailForm('#mail-form', '#success_msg', '7fb35345-752d-4792-9480-cd3db6674a62');

     var specialsTemplate = (function($, _){

      var base_url = 'http://web-api.tysonsteele.com/v1/webprops/';
      var uid, template_id, data_targets;

      var _fetchSpecialsData = function() {
        var fetch_url = base_url+uid+'/specials';
        return $.getJSON(fetch_url);
      };

      var _renderSpecials = function(data) {
        var specials_template = _.template($(template_id).html());
        $.each(data.specials, function(i, special) {
          var special_class = special.key;
          $('.'+special_class).html(specials_template(special));
        })
        $.each(data_targets, function(key, target){
          $(target).html(data[key]);
        });
      }

      var init = function(_uid, _template_id, _data_targets) {
        uid = _uid;
        template_id = _template_id;
        data_targets = _data_targets;

        var fetchSpecials = _fetchSpecialsData();
        fetchSpecials.done(function(response){
          _renderSpecials(response.data);
        });
      };

      return {
        init: init
      };
  });

})(jQuery, _);
