$(function () {
  var width = $(window).width(),
      height = $(window).height();

  var dots = [];

  dots.push(_.times(width / (10 * 2), function (index) {
    return $('<div />').addClass('dot').css({top: 0, left: (index * 20)});
  }));
  dots.push(_.times(width / (10 * 2), function (index) {
    return $('<div />').addClass('dot').css({bottom: 0, left: (index * 20)});
  }));
  dots.push(_.times(height / (10 * 2), function (index) {
    return $('<div />').addClass('dot').css({top: (index * 20), left: 0});
  }));
  dots.push(_.times(height / (10 * 2), function (index) {
    return $('<div />').addClass('dot').css({top: (index * 20), right: 0});
  }));
  console.log('flat', _.flatten(dots));
  _.flatten(dots).forEach(function (dot) {
    console.log('adding dot', dot);
    $('body').append(dot);
  });
  console.log('dots', dots);

});
