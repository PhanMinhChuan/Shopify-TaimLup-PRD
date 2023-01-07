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

		$("body").on('click touchstart', '.load-more', function (e) {
			e.preventDefault();
			$(".load-more-col:hidden").slice(0, 10).slideDown();
			if ($(".load-more-col:hidden").length == 0) {
				$(".load-more").css('visibility', 'hidden');
			}
		});

    $('#dropdown-item').click(function(){
      $('.dropdown-item__custom').toggleClass('active');
      $('.custom-menu__li').toggleClass('active');
    });

    $('#dropdown-item_pants').click(function(){
      $('.dropdown-item__custom-pants').toggleClass('active');
      $('.custom-menu__li-pants').toggleClass('active');
    });

    if (localStorage.getItem("index_cart") != null) {
      document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
      var index = localStorage.getItem("index_cart");
      if (index != null) {
          var price_total = 0;
          var cartItem = "";
          for (var i = 0; i < index; i++) {
              cartItem += "<div class='media'>" +
                              "<a class='pull-left' style='padding-right: 13px;'>" +
                                  "<img class='media-object' src='"+ JSON.parse(localStorage.getItem("products"))[i].product_src_1 +"' alt='image'  style='width: 80px;'/>" +
                              "</a>" +
                              "<div class='media-body'>" +
                                  "<h4 class='media-heading'><a href='#!'>" + JSON.parse(localStorage.getItem("products"))[i].product_name + "</a></h4>" +
                                  "<h5 style='margin-top: 25px; color: #000'>" + JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</h5>" +
                              "</div>" +
                              "<a class='remove' onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\")'><i class='tf-ion-close'></i></a>" +
                          "</div>";
              price_total += parseInt(JSON.parse(localStorage.getItem("products"))[i].product_price.replaceAll(',', ''));
          }
          if (cartItem == "") {
            cartItem = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p>"
          }
          document.getElementById("scrollbar_custom").innerHTML = cartItem;
          document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
      }
    } else {
      cartItem = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p>";
      document.getElementById("scrollbar_custom").innerHTML = cartItem;
    }
  });

  window.onhashchange = function() {
    alert('hello');
  }

  window.addEventListener('popstate', function(event) {
    this.alert('alert');
}, false);

window.addEventListener('popstate', function (e) {
  var state = e.state;
  if (state !== null) {
      //load content with ajax
  }
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

function removeProductFormCart(id) {
  var arr = JSON.parse(localStorage.getItem("products"));
  var index = localStorage.getItem("index_cart");

  const objWithIdIndex = arr.findIndex((obj) => obj.product_id == id);
  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  localStorage.setItem("products", JSON.stringify(arr));
  localStorage.setItem("index_cart", parseInt(index)-1);

  var indexNew = localStorage.getItem("index_cart");

  document.getElementById("lblCartCount").innerHTML = indexNew;

  if (indexNew == '0') {
    document.getElementById("scrollbar_custom").innerHTML = "";
    document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(0);
    cartItem = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p>";
    document.getElementById("scrollbar_custom").innerHTML = cartItem;
  } else {
      var price_total = 0;
      var cartItem = "";
      for (var i = 0; i < indexNew; i++) {
          cartItem += "<div class='media'>" +
                          "<a class='pull-left' style='padding-right: 13px;'>" +
                              "<img class='media-object' src='"+ JSON.parse(localStorage.getItem("products"))[i].product_src_1 +"' alt='image'  style='width: 80px;'/>" +
                          "</a>" +
                          "<div class='media-body'>" +
                              "<h4 class='media-heading'><a href='#!'>" + JSON.parse(localStorage.getItem("products"))[i].product_name + "</a></h4>" +
                              "<h5 style='margin-top: 25px; color: #000'>" + JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</h5>" +
                          "</div>" +
                          "<a class='remove' onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\")'><i class='tf-ion-close'></i></a>" +
                      "</div>";
          price_total += parseInt(JSON.parse(localStorage.getItem("products"))[i].product_price.replaceAll(',', ''));
      }
      document.getElementById("scrollbar_custom").innerHTML = cartItem;
      document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
  }
}
