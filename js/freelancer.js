// Freelancer Theme JavaScript

(function ($) {
  "use strict"; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('.page-scroll button').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 100)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();

      $('#mainNav .logo').animate({
        scrollRight: ($('.logo').offset().right - 100)
      }, 1250, 'easeInOutExpo');
    }
  );

// Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 100
  });

// Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
  });

// Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 100
    }
  })

// Floating label headings for the contact form
  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });


  $("div.ecc-tab-menu>div.list-group>a").click(function (e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $("div.ecc-tab>div.ecc-tab-content").removeClass("active");
    $("div.ecc-tab>div.ecc-tab-content").eq(index).addClass("active");
  });


})
(jQuery); // End of use strict


$(document).ready(function () {

});
