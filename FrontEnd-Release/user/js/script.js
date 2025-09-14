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
      slidesToScroll: 7,
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

    $('#dropdown-item').click(function(){
      $('.dropdown-item__custom').toggleClass('active');
      $('.custom-menu__li').toggleClass('active');
    });

    $('#dropdown-item_sp').click(function(){
      $('.dropdown-item__custom_sp').toggleClass('active');
      $('.custom-menu__li__ao').toggleClass('active');
    });

    $('#dropdown-item_pants').click(function(){
      $('.dropdown-item__custom-pants').toggleClass('active');
      $('.custom-menu__li-pants').toggleClass('active');
    });

    $('#dropdown-item_sp_ao').click(function(){
      $('#menu-type_1_sp').toggleClass('active');
      $('#custom-menu__li_sp_ao').toggleClass('active');
      
    });

    $('#custom-menu__li_sp_quan').click(function(){
      $('#menu-type_2_sp').toggleClass('active');
      $('#custom-menu__li_sp_quan').toggleClass('active');
      
    });

    $('#custom-menu__li_sp_phukien').click(function(){
      $('#menu-type_3_sp').toggleClass('active');
      $('#custom-menu__li_sp_phukien').toggleClass('active');
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
      autoplay: true,
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
  //$('input[name=\'product-quantity\']').TouchSpin();


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
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'heroSliderArrow prevArrow tf-ion-chevron-left\' style="width: 40px; height: 40px;"></button>',
    nextArrow: '<button type=\'button\' class=\'heroSliderArrow nextArrow tf-ion-chevron-right\' style="width: 40px; height: 40px;"></button>',
    dots: false,
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

function nextMenu() {
  if($("#menu__hide")[0].checked == false) {
      document.getElementById("logo-menu").innerHTML = "<i class='bi bi-x' style='font-size: 30px;'></i>";
  } else {
      document.getElementById("logo-menu").innerHTML = "<i class='bi bi-list' style='font-size: 30px;'></i>";
  }
}

function removeProductFormCart(id) {
  var arr = JSON.parse(localStorage.getItem("products"));
  var index = localStorage.getItem("index_cart");

  const objWithIdIndex = arr.findIndex((obj) => obj == id);
  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  localStorage.setItem("products", JSON.stringify(arr));
  localStorage.setItem("index_cart", parseInt(index)-1);

  var array_product = JSON.parse(localStorage.getItem("products"));
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
      var sold_out = "";

      if (localStorage.getItem("index_cart") != null) {
        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
        var index = localStorage.getItem("index_cart");
        var array_product = JSON.parse(localStorage.getItem("products"));
        var array_id = [];
      
        if (index != null) {
            var price_total = 0;
            var cartItem = "";
      
            for (var i = 0; i < array_product.length; i++) {
              if(array_product[i]) {
                  array_id.push(parseInt(array_product[i]));
              }
            }
            var object = {};
            object['list_id'] = array_id;
            fetch("https://taimlup.com:8443/vintage/product/list", {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify(object) // This is your file object
                })
                .then((response) => response.json().then((data) => {
                    if (data != null) {
                      if (data.length != null) {
                        localStorage.setItem("index_cart", data.length);
                        array_product = [];
                        for (var i = 0; i < data.length; i++) {
                          if (data[i] != null) {
                            if (data[i].images[0] != null) {
                              array_product.push(data[i].id);
                              var sold_out = "";
                              if (data[i].wait_buy == 1) {
                                  sold_out = "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>";
                              }
                              if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                                var price = parseInt(data[i].price.replaceAll(',', ''));
                                var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                                reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 16px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                                price_total += parseInt(price-int_reduced_price);
                              } else {
                                  //reduced_price = "<h5 style='margin-top: 18px; color: #000'>" + data[i].price + "₫</h5>";
                                  reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 15px; color: #333'>" + data[i].price + "₫</p>";
                                  price_total += parseInt(data[i].price.replaceAll(',', ''));
                              }
                              cartItem += "<div class='media'>" +
                                  "<a class='pull-left' style='padding-right: 13px;'>" +
                                      "<img class='media-object' src='"+ data[i].images[0].path +"' alt='image'  style='width: 80px;'/>" +
                                  "</a>" +
                                  "<div class='media-body'>" +
                                      sold_out  +
                                      "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + data[i].name + "</a></h4>" +
                                      reduced_price +
                                  "</div>" +
                                  "<a class='remove' onclick='removeProductFormCart(\""+ data[i].id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                              "</div>";
                            }
                          }
                        }
                        localStorage.setItem("products", JSON.stringify(array_product));
                        document.getElementById("scrollbar_custom").innerHTML = cartItem;
                        document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total).replaceAll('.',',');
                      }
                    } else {
                      localStorage.setItem("index_cart", 0);
                    }
                })
            );
            if (cartItem == "") {
              document.getElementById("scrollbar_custom").innerHTML = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>"
            }
        }
      } else {
        cartItem = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
        document.getElementById("scrollbar_custom").innerHTML = cartItem;
      }

      // for (var i = 0; i < indexNew; i++) {
      //   if (array_product[i] != null) {
      //     fetch("https://taimlup.com:8443/vintage/product/" + array_product[i]).then(
      //             (response) => response.json().then((data) => {
      //                 if (data != null) {
      //                     if (data.images[0] != null) {
      //                         if (data.wait_buy == 1) {
      //                             sold_out = "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>";
      //                         }
      //                         cartItem += "<div class='media'>" +
      //                             "<a class='pull-left' style='padding-right: 13px;'>" +
      //                                 "<img class='media-object' src='"+ data.images[0].path +"' alt='image'  style='width: 80px;'/>" +
      //                             "</a>" +
      //                             "<div class='media-body'>" +
      //                                 sold_out  +
      //                                 "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + data.name + "</a></h4>" +
      //                                 "<h5 style='margin-top: 18px; color: #000'>" + data.price + "₫</h5>" +
      //                             "</div>" +
      //                             "<a class='remove' onclick='removeProductFormCart(\""+ data.id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
      //                         "</div>";
      //                         price_total += parseInt(data.price.replaceAll(',', ''));
      //                         document.getElementById("scrollbar_custom").innerHTML = cartItem;
      //                         document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
      //                     } else {
      //                         var index_array = array_product.indexOf(array_product[i]);
      //                         if (index_array !== -1) {
      //                             array_product.splice(index_array, 1);
      //                             localStorage.setItem("products", JSON.stringify(array_product));
      //                         }
      //                     }
      //                 } else {
      //                     var index_array = array_product.indexOf(array_product[i]);
      //                     if (index_array !== -1) {
      //                         array_product.splice(index_array, 1);
      //                         localStorage.setItem("products", JSON.stringify(array_product));
      //                     }
      //                 }
      //             })
      //       );
      //   }
      // }
  }
}

$('input[type=search]').on('input', function(){
  clearTimeout(this.delay);
  this.delay = setTimeout(function(){

  /* call ajax request here */


  // getting all required elements
  const searchWrapper = document.querySelector( ".search-input" );
  const inputBox = searchWrapper.querySelector( "input" );
  const suggBox = searchWrapper.querySelector(".autocom-box" );
  const icon = searchWrapper.querySelector(".icon");
  let linkTag = searchWrapper.querySelector( "a" );
  let webLink;

  var names = [];
  var ids = [];
  var imgs = [];

  if (this.value != '') {
    fetch("https://taimlup.com:8443/vintage/product/search/"+this.value).then(
      (response) => response.json().then((data) => {
        
  
        for (var i = 0; i <= data.length; i++) {
          if (data[i] != null) {
            names.push(data[i].name);
            ids.push(data[i].id);
            imgs.push(data[i].images[0].path);

            // if user press any key and release
            inputBox.onkeyup = (e) => {
              let userData = e.target.value; //user enetered data
              let emptyArray = [];       

              emptyArray = names.filter((data) => {
        
                // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
                return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
              });

              var index = 0;
              emptyArray = emptyArray.map((data) => {
                 //passing return data inside li tag
                 data = "<a href='product?id="+ ids[index] +"'><li style='border-top: 1px solid #b4aaaa; text-overflow: ellipsis; display: inline-block; width: 100%; white-space: nowrap; overflow: hidden !important;'><img style='height: 50px; padding-right: 15px;' src='"+ imgs[index] +"' alt='product-img' href='product'/>"+ data +"</li></a>";
                 index++;
                 return data;
              });
              //for (var j = 0; j < emptyArray.length; j++) {
              //  return data = "<li style='border-top: 1px solid #b4aaaa;'>" + emptyArray[j] + "</li>";
              //}
        
              searchWrapper.classList.add("active"); //show autocomplete box
        
              showSuggestions(emptyArray);
            }
          }
        }
      })
    );
  } else {
    // if user press any key and release
    inputBox.onkeyup = (e) => {
      let userData = e.target.value; //user enetered data
      let emptyArray = [];       

      emptyArray = names.filter((data) => {

        // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
        return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });

      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return data = "";
      });

      searchWrapper.classList.add("active"); //show autocomplete box

      showSuggestionsRemove(emptyArray);

      let allList = "";

      for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute( "onclick", "select(this) ");
      }
    }
  }

	function showSuggestions ( list ) {
		let listData;
		if(!list.length ){
			userValue = inputBox.value;
			listData = '<li>'+ userValue +'</li>';
		}else{
			listData = list.join('');
		}
		suggBox.innerHTML= listData;
	}

  function showSuggestionsRemove ( list ) {
		let listData = '';
		suggBox.innerHTML= listData;
	}

  }.bind(this), 1);
});

$('input[type=search]').on("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    localStorage.setItem("search_value", this.value);
    window.location.href= "/vintage?search=" + this.value;
  }
});

$('#search_repo').on('input', function(){
  clearTimeout(this.delay);
  this.delay = setTimeout(function(){

  /* call ajax request here */


  // getting all required elements
  const searchWrapper = document.querySelector( ".search-input-repo" );
  const inputBox = searchWrapper.querySelector( "input" );
  const suggBox = searchWrapper.querySelector(".autocom-box-repo" );
  const icon = searchWrapper.querySelector(".icon");
  let linkTag = searchWrapper.querySelector( "a" );
  let webLink;

  var names = [];
  var ids = [];
  var imgs = [];

  if (this.value != '') {
    fetch("https://taimlup.com:8443/vintage/product/search/"+this.value).then(
      (response) => response.json().then((data) => {
        
  
        for (var i = 0; i <= data.length; i++) {
          if (data[i] != null) {
            names.push(data[i].name);
            ids.push(data[i].id);
            imgs.push(data[i].images[0].path);

            // if user press any key and release
            inputBox.onkeyup = (e) => {
              let userData = e.target.value; //user enetered data
              let emptyArray = [];       

              emptyArray = names.filter((data) => {
        
                // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
                return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
              });

              var index = 0;
              emptyArray = emptyArray.map((data) => {
                 //passing return data inside li tag
                 data = "<a href='product?id="+ ids[index] +"'><li style='border-top: 1px solid #b4aaaa; text-overflow: ellipsis; display: inline-block; width: 100%; white-space: nowrap; overflow: hidden !important;'><img style='height: 50px; padding-right: 15px;' src='"+ imgs[index] +"' alt='product-img' href='product'/>"+ data +"</li></a>";
                 index++;
                 return data;
              });
              //for (var j = 0; j < emptyArray.length; j++) {
              //  return data = "<li style='border-top: 1px solid #b4aaaa;'>" + emptyArray[j] + "</li>";
              //}
        
              searchWrapper.classList.add("active"); //show autocomplete box
        
              showSuggestions(emptyArray);
            }
          }
        }
      })
    );
  } else {
    // if user press any key and release
    inputBox.onkeyup = (e) => {
      let userData = e.target.value; //user enetered data
      let emptyArray = [];       

      emptyArray = names.filter((data) => {

        // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
        return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });

      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return data = "";
      });

      searchWrapper.classList.add("active"); //show autocomplete box

      showSuggestionsRemove(emptyArray);

      let allList = "";

      for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute( "onclick", "select(this) ");
      }
    }
  }

	function showSuggestions ( list ) {
		let listData;
		if(!list.length ){
			userValue = inputBox.value;
			listData = '<li>'+ userValue +'</li>';
		}else{
			listData = list.join('');
		}
		suggBox.innerHTML= listData;
	}

  function showSuggestionsRemove ( list ) {
		let listData = '';
		suggBox.innerHTML= listData;
	}

  }.bind(this), 1);
});

function showSearch() {
  document.getElementById("menu_1").style.display = 'none';
  document.getElementById("menu_2").style.display = 'block';
}

function disableSearch() {
  document.getElementById("menu_1").style.display = 'block';
  document.getElementById("search_repo").value = '';

  const searchWrapper = document.querySelector( ".search-input-repo" );
  const suggBox = searchWrapper.querySelector(".autocom-box-repo" );

  let listData = '';
  suggBox.innerHTML= listData;
}

function changeChevron() {
  document.getElementById("chevron-change__custom").classList.toggle("bi-chevron-up");
}

function changeChevronPants() {
  document.getElementById("chevron-change__customPants").classList.toggle("bi-chevron-up");
}

function changeChevronSP() {
  document.getElementById("chevron-change__custom_sp").classList.toggle("bi-chevron-up");
}

function changeChevronSP_1() {
  document.getElementById("chevron-change__custom_sp_1").classList.toggle("bi-chevron-up");
}

function changeChevronSP_2() {
  document.getElementById("chevron-change__custom_sp_2").classList.toggle("bi-chevron-up");
}

function changeChevronSP_3() {
  document.getElementById("chevron-change__custom_sp_3").classList.toggle("bi-chevron-up");
}

function changeChevronPantsSP() {
  document.getElementById("chevron-change__customPants_sp").classList.toggle("bi-chevron-up");
}

if (localStorage.getItem("index_cart") != null) {
  document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
  var index = localStorage.getItem("index_cart");
  var array_product = JSON.parse(localStorage.getItem("products"));
  var array_id = [];

  if (index != null) {
      var price_total = 0;
      var cartItem = "";

      for (var i = 0; i < array_product.length; i++) {
        if(array_product[i]) {
            array_id.push(parseInt(array_product[i]));
        }
      }
      var object = {};
      object['list_id'] = array_id;
      fetch("https://taimlup.com:8443/vintage/product/list", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(object) // This is your file object
          })
          .then((response) => response.json().then((data) => {
              if (data != null) {
                if (data.length != null) {
                  localStorage.setItem("index_cart", data.length);
                  array_product = [];
                  for (var i = 0; i < data.length; i++) {
                    if (data[i] != null) {
                      if (data[i].images[0] != null) {
                        array_product.push(data[i].id);
                        var sold_out = "";
                        if (data[i].wait_buy == 1) {
                            sold_out = "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>";
                        }
                        if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                          var price = parseInt(data[i].price.replaceAll(',', ''));
                          var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                          reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 16px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                          price_total += parseInt(price-int_reduced_price);
                        } else {
                            //reduced_price = "<h5 style='margin-top: 18px; color: #000'>" + data[i].price + "₫</h5>";
                            reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 15px; color: #333'>" + data[i].price + "₫</p>";
                            price_total += parseInt(data[i].price.replaceAll(',', ''));
                        }
                        cartItem += "<div class='media'>" +
                            "<a class='pull-left' style='padding-right: 13px;' href='product?id=" + data[i].id + "'>" +
                                "<img class='media-object' src='"+ data[i].images[0].path +"' alt='image'  style='width: 80px;'/>" +
                            "</a>" +
                            "<div class='media-body'>" +
                                sold_out  +
                                "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='product?id=" + data[i].id + "'>" + data[i].name + "</a></h4>" +
                                reduced_price +
                            "</div>" +
                            "<a class='remove' onclick='removeProductFormCart(\""+ data[i].id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                        "</div>";
                      }
                    }
                  }
                  localStorage.setItem("products", JSON.stringify(array_product));
                  if (cartItem == "") {
                    document.getElementById("scrollbar_custom").innerHTML = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>"
                  } else {
                    document.getElementById("scrollbar_custom").innerHTML = cartItem;
                  }
                  document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total).replaceAll('.',',');
                } else {
                  localStorage.setItem("index_cart", 0);
                }
              }
          })
      );

      // for (var i = 0; i < index; i++) {
      //   if (array_product[i] != null) {
      //     fetch("https://taimlup.com:8443/vintage/product/" + array_product[i]).then(
      //           (response) => response.json().then((data) => {
      //               if (data != null) {
      //                   if (data.images[0] != null) {
      //                       var sold_out = "";
      //                       if (data.wait_buy == 1) {
      //                           sold_out = "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>";
      //                       }
      //                       cartItem += "<div class='media'>" +
      //                           "<a class='pull-left' style='padding-right: 13px;'>" +
      //                               "<img class='media-object' src='"+ data.images[0].path +"' alt='image'  style='width: 80px;'/>" +
      //                           "</a>" +
      //                           "<div class='media-body'>" +
      //                               sold_out  +
      //                               "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + data.name + "</a></h4>" +
      //                               "<h5 style='margin-top: 18px; color: #000'>" + data.price + "₫</h5>" +
      //                           "</div>" +
      //                           "<a class='remove' onclick='removeProductFormCart(\""+ data.id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
      //                       "</div>";
      //                       price_total += parseInt(data.price.replaceAll(',', ''));
      //                       document.getElementById("scrollbar_custom").innerHTML = cartItem;
      //                       document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
      //                   } else {
      //                       var index_array = array_product.indexOf(array_product[i]);
      //                       if (index_array !== -1) {
      //                           array_product.splice(index_array, 1);
      //                           localStorage.setItem("products", JSON.stringify(array_product));
      //                       }
      //                   }
      //               } else {
      //                   var index_array = array_product.indexOf(array_product[i]);
      //                   if (index_array !== -1) {
      //                       array_product.splice(index_array, 1);
      //                       localStorage.setItem("products", JSON.stringify(array_product));
      //                   }
      //               }
      //           })
      //     );
      //   }
      // }
  }
} else {
  cartItem = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
  document.getElementById("scrollbar_custom").innerHTML = cartItem;
}

function cache_reload_data() {
  if (localStorage.getItem("index_cart") != null) {
    document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
    var index = localStorage.getItem("index_cart");
    var array_product = JSON.parse(localStorage.getItem("products"));
    var array_id = [];
  
    if (index != null) {
        var price_total = 0;
        var cartItem = "";
  
        for (var i = 0; i < array_product.length; i++) {
          if(array_product[i]) {
              array_id.push(parseInt(array_product[i]));
          }
        }
        var object = {};
        object['list_id'] = array_id;
        return fetch("https://taimlup.com:8443/vintage/product/list", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(object) // This is your file object
            })
            .then((response) => response.json().then((data) => {
                if (data != null) {
                  if (data.length != null) {
                    localStorage.setItem("index_cart", data.length);
                    array_product = [];
                    for (var i = 0; i < data.length; i++) {
                      if (data[i] != null) {
                        if (data[i].images[0] != null) {
                          array_product.push(data[i].id);
                          var sold_out = "";
                          if (data[i].wait_buy == 1) {
                              sold_out = "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>";
                          }
                          if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                            var price = parseInt(data[i].price.replaceAll(',', ''));
                            var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                            reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 16px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                            price_total += parseInt(price-int_reduced_price);
                          } else {
                            reduced_price = "<h5 style='margin-top: 18px; color: #000'>" + data[i].price + "₫</h5>";
                            price_total += parseInt(data[i].price.replaceAll(',', ''));
                          }
                          cartItem += "<div class='media'>" +
                              "<a class='pull-left' style='padding-right: 13px;'>" +
                                  "<img class='media-object' src='"+ data[i].images[0].path +"' alt='image'  style='width: 80px;'/>" +
                              "</a>" +
                              "<div class='media-body'>" +
                                  sold_out  +
                                  "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + data[i].name + "</a></h4>" +
                                  reduced_price +
                              "</div>" +
                              "<a class='remove' onclick='removeProductFormCart(\""+ data[i].id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                          "</div>";
                        }
                      }
                    }
                    localStorage.setItem("products", JSON.stringify(array_product));
                    if (cartItem == "") {
                      document.getElementById("scrollbar_custom").innerHTML = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>"
                    } else {
                      document.getElementById("scrollbar_custom").innerHTML = cartItem;
                    }
                    document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total).replaceAll('.',',');
                  } else {
                    localStorage.setItem("index_cart", 0);
                  }
                }
            })
        );
    }
  } else {
    cartItem = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
    document.getElementById("scrollbar_custom").innerHTML = cartItem;
  }
}