$(document).ready(function () {


  $(document).on("scroll", function () {
    // if (document.body.scrollTop > 15) {
    //   console.log("hi")
    //   $("#ecc-header-logo").animate({
    //       "top": "2vh",
    //       "max-width": "30%",
    //
    //   //     }, 500, $.bez([.22,.68,.5,1.71])
    //     )
    //   }// else if (document.body.scrollTop <= 120) {
    //   //   console.log("UPP")
    //   //   $("#ecc-header-logo").animate({
    //   //       "top": "15vh",
    //   //       "max-width": "65%",
    //   //
    //   //     }, 500
    //   //   )
    //   // }
    // })


    var $win = $(window);
     // winH = $win.height();
    $win.on('scroll', function () {

      var topDistance = $win.scrollTop()  ;

      $("#ecc-header-logo").css({
        "top": `${14 + (-.4 * topDistance) / 10}vh`,
        "width": `${topDistance / 10}%`

      })

  /


      // $('.helix').css({
      //   transform: "rotateY(" + ($win.scrollTop() * .5) + "deg)",
      //   "perspective-origin": origin
      // });
    });

  })
});
