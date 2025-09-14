/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
  'use strict';

  // Preloader
  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
    $('.slider').slick({
      autoplay:true,
      autoplaySpeed: 5000,
      slidesToShow: 7,
      slidesToScroll: 3,
      pauseOnFocus: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            arrows: false,
          },
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 2,
            arrows: false,
          },
        },
      ],
    });

    $('.slider_2').slick({
      autoplay:false,
      slidesToShow: 6,
      arrows: true,
      slidesToScroll: 6,
      draggable:true,
      swipeToSlide: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            arrows: false,
          },
        },
      ],
    });

    var btn = $('#back-to-top');
    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });

    $(".load-more-col").slice(0, 15).show();
		$("body").on('click touchstart', '.load-more', function (e) {
			e.preventDefault();
			$(".load-more-col:hidden").slice(0, 10).slideDown();
			if ($(".load-more-col:hidden").length == 0) {
				$(".load-more").css('visibility', 'hidden');
			}
		});


  });
  
  // Instagram Feed
  if (($('#instafeed').length) !== 0) {
    var accessToken = $('#instafeed').attr('data-accessToken');
    var userFeed = new Instafeed({
      get: 'user',
      resolution: 'low_resolution',
      accessToken: accessToken,
      template: '<a href="{{link}}"><img src="{{image}}" alt="instagram-image"></a>'
    });
    userFeed.run();
  }

  setTimeout(function () {
    $('.instagram-slider').slick({
      dots: false,
      speed: 300,
      // autoplay: true,
      arrows: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }, 1500);

  // e-commerce touchspin
  $('input[name=\'product-quantity\']').TouchSpin();


  // Video Lightbox
  $(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });


  // Count Down JS
  $('#simple-timer').syotimer({
    year: 2022,
    month: 5,
    day: 9,
    hour: 20,
    minute: 30
  });

  //Hero Slider
  $('.hero-slider').slick({
    // autoplay: true,
    infinite: true,
    arrows: false,
    prevArrow: '<button type=\'button\' class=\'heroSliderArrow prevArrow tf-ion-chevron-left\'></button>',
    nextArrow: '<button type=\'button\' class=\'heroSliderArrow nextArrow tf-ion-chevron-right\'></button>',
    dots: false,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnFocus: false,
    pauseOnHover: false
  });
  $('.hero-slider').slickAnimation();


})(jQuery);

/*Custom js*/
function backToTopEvent() {
  $('html, body').animate({scrollTop:0}, '300');
}
