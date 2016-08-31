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
 })(jQuery, _);
