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
    //  specialsTemplate.init(
    //      '7fb35345-752d-4792-9480-cd3db6674a62',
    //      '#special_template',
    //      {
    //          period_ends: '#period_ends',
    //          period_label: '#period_label'
    //      }
    //  );
    $('#nav').affix({
        offset: {
            top: $('header').height()
        }
    });
    $( window ).resize(function() {
        console.log(window);
        if ($(window).width() < 768) {
            $('#section-visit').removeClass('parallax');
            console.log("here");
        }
        else {
            $('#section-visit').addClass('parallax');
        }
        $('#primary-menu a').click(function () {
            console.log('test');
            if ($('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
                $('#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu').toggleClass("show");
            } else {
                $('#primary-menu > ul, #primary-menu > div > ul').toggleClass("show");
            }
        });
    });
    if ($(window).width() < 768) {
        $('#section-visit').removeClass('parallax');
        console.log("here");
        $("#section-office-tour .container").removeClass('container');
    }

    if ($(window).width() < 992) {
        $('#primary-menu a').click(function () {
            if ($('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
                $('#primary-menu > ul.mobile-primary-menu, #primary-menu > div > ul.mobile-primary-menu').toggleClass("show");
            } else {
                $('#primary-menu > ul, #primary-menu > div > ul').toggleClass("show");
            }
        });
    }
})(jQuery, _);
