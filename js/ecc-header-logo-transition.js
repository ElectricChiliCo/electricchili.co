$(document).ready(function () {

  $(document).on("scroll", function () {
    var $win = $(window);
    $win.on('scroll', function (e) {
      var topDistance = $win.scrollTop();
      var innerHeight = window.innerHeight;

      var logoHeightValue = function (innerHeight, topDistance) {
        return 30 - (topDistance / 10);
      };

      var callToActionHeightValue = function (innerHeight, topDistance) {
        return 50 + (topDistance / 30);
      };

      var callToActionOpacity = function (innerHeight, topDistance) {
        return 1 - (topDistance / 200);
      };

      $("#ecc-header-logo").css({
        "top": `${logoHeightValue(innerHeight, topDistance)}%`,
      });

      $("#call-to-action-btn").css({
        "top": `${callToActionHeightValue(innerHeight, topDistance)}%`,
        "opacity": `${callToActionOpacity(innerHeight, topDistance)}`,
      });
    });
  })
});
