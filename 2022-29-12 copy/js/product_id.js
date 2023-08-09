window.addEventListener('load', (event) =>{
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    fetch("https://taimlup.com:8443/vintage/product/" + id).then(
        (response) => response.json().then((data) => {
            var slide= "";
            var thumb = "";

            if (data != null) {
                for (var i = 0; i < data.images.length; i++) {
                    if (i != 0) {
                        slide += "<div class='item' onclick='zoom100(\""+ (i+1) + "\")'> <img id='" + (i+1) + "' src='" + data.images[i].path + "' alt='' data-zoom-image='" + data.images[i].path + "' /></div>";
                        thumb += "<li data-target='#carousel-custom' data-slide-to='"+i+"'> <img src='" + data.images[i].path + "' alt='' /></li>";
                    } else {
                        slide += "<div class='item active' onclick='zoom100(\""+ (i+1) + "\")'> <img id='" + (i+1) + "' src='" + data.images[i].path + "' alt='' data-zoom-image='" + data.images[i].path + "' /></div>";
                        thumb += "<li data-target='#carousel-custom' data-slide-to='"+i+"' class='active'> <img src='" + data.images[i].path + "' alt='' /></li>";
                    }
                }
                slide += "<div class='item' onclick='zoomDefault()'> <img src='/images/product_default.jpg' alt='' data-zoom-image='/images/product_default.jpg' /></div>";
                thumb += "<li data-target='#carousel-custom' data-slide-to='"+data.images.length+"'> <img src='/images/product_default.jpg' alt='' /></li>";

                if (data.wait_buy == 1) {
                   document.getElementById('sold-out').innerHTML = "<span class='bage-custom' style='z-index: 2;'>HẾT HÀNG</span>";
                }

                document.getElementById("product_name").innerHTML = data.name;
                if (data.size_model != "") {
                    document.getElementById("size_model").innerHTML = "Mẫu mang: " + data.size_model;
                }
                if (data.size_length != '') {
                    document.getElementById("check_size_length").innerHTML = "<span style='height: 28px; width: 210px;'>- Độ dài/Lenght (cm):</span><p style='color: black; font-weight: 700; font-style: italic;'>"+ data.size_length +"</p><br>";
                } else {
                    document.getElementById("check_size_length").style.display = 'none';
                }
                var nguceo = "";
                if (data.type == 'ao') {
                    nguceo = "Độ rộng ngực/Chest"
                } else {
                    nguceo = "Độ rộng eo/Waist"
                }
                if (data.size_waist != '') {
                    document.getElementById("check_size_waist").innerHTML = "<span style='height: 28px; width: 210px;'>- "+ nguceo +" (cm):</span><p style='color: black; font-weight: 700; font-style: italic;'>"+ data.size_waist +"</p><br>";
                } else {
                    document.getElementById("check_size_waist").style.display = 'none';
                }
                if (data.condition_percent != '') {
                    document.getElementById("check_condition_percent").innerHTML = "<span style='height: 28px; width: 210px;'>● Độ mới/Condition (%):</span><p style='color: black; font-weight: 700; font-style: italic;'>"+ data.condition_percent +"</p>";
                } else {
                    document.getElementById("check_condition_percent").style.display = 'none';
                }
                document.getElementById("size").innerHTML = "<p style='color: black;'>" + data.size +"</p>";
                if (data.reduced_price != '' && data.reduced_price != null) {
                    var price = parseInt(data.price.replaceAll(',', ''));
                    var reduced_price = parseInt(data.reduced_price.replaceAll(',', ''));
                    document.getElementById("price").innerHTML = new Intl.NumberFormat('vi-VN', { currency : 'VND'}).format(price - reduced_price);
                    document.getElementById("price").innerHTML = document.getElementById("price").innerHTML.replaceAll('.',',');
                    document.getElementById("old_price").innerHTML = data.price;
                } else {
                    document.getElementById("price").innerHTML = data.price;
                    document.getElementById("old_price_div").style.display = 'none';
                }
                
                if (data.size_leg != '') {
                    document.getElementById("size_leg").innerHTML = "<div class='color-swatches'><span style='height: 28px; width: 210px;'>- Ống quần/Lower leg (cm):</span><p style='color: black; font-weight: 700; font-style: italic;'>" + data.size_leg + "</p></div>";
                }
                document.getElementById("zoom-effect").innerHTML = slide;
                document.getElementById("thumb_images").innerHTML = thumb;
                if (data.wait_buy == 1) {
                    document.getElementById('addToCard').style.display ='none';
                    document.getElementById('buyNow').style.display ='none';
                }

                return fetch("https://taimlup.com:8443/vintage/products_type_detail/" + data.type_detail).then(
                    (response) => response.json().then((data) => {
                        var listProduct = "<div class='slider_2 responsive'>";

                        for (var i = 0; i <= data.length; i++) {
                            if (data[i] != null) {
                                if (data[i].id != id) {
                                    var sold = "";
                                    if (data[i].wait_buy == 0) {
                                        sold = "<img class='img-responsive img-rev' src='" + data[i].images[0].path + "' alt='product-img' href='product' />" + "<img class='img-responsive img-rev' src='" + data[i].images[1].path + "' alt='product-img' href='product' />";
                                    } else {
                                        sold = "<span class='bage' style='z-index: 1;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive img-rev' src='" + data[i].images[0].path + "' alt='product-img' href='product'/ >" + "<img class='img-responsive img-rev' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
                                    }
                                    var reduced_price = "";
                                    if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                                        var price = parseInt(data[i].price.replaceAll(',', ''));
                                        var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                                        reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 16px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                                    } else {
                                        reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 15px; color: #333'>" + data[i].price + "₫</p>";
                                    }
                                    listProduct += "<div class='load-more-col responsive-list'>" +
                                                        "<div class='product-item' style='padding: 2%'>" +
                                                            "<a href='product?id=" + data[i].id + "' >" +
                                                                "<div class='product-thumb hover-switch'>" +
                                                                    sold +
                                                                "</div>" +
                                                            "</a>" +
                                                            "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                                "<a href='product?id=" + data[i].id + "' class='product-name__custom-1' >" + data[i].name + "</a><br>" +
                                                                "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                                reduced_price +
                                                            "</div>" +
                                                        "</div>" +
                                                    "</div>";
                                }
                            }
                        }
                        listProduct += '</div>';
                        document.getElementById("relative_products").innerHTML = listProduct;
                        $('.slider_2').slick({
                            autoplay:false,
                            slidesToShow: 6,
                            arrows: true,
                            draggable:true,
                            swipeToSlide: true,
                            infinite: false,
                            cssEase: 'linear',
                            useTransform: false,
                            speed: 550,
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
                    })
                );
            }
        })
    );
});

function addProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var array_product = JSON.parse(localStorage.getItem("products"));
    var index = localStorage.getItem("index_cart");

    if (index == null) {
        index = 0;
    }
    var count = 0;
    if (array_product != null) {
        for (var i = 0; i < index; i++) {
            if (id == array_product[i]) {
                count++;
            }
        }
    } else {
        array_product = [];
    }

    if (count == 0) {
        localStorage.setItem("index_cart", (parseInt(index) + 1));
        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

        array_product.push(id);
        localStorage.setItem("products", JSON.stringify(array_product));

        var price_total = 0;
        var cartItem = "";

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
                            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                        } else {
                            localStorage.setItem("index_cart", 0);
                        }
                    }
                })
            );
        }
        showSuccessToast();
    } else {
        showErrorToast();
    }
}


function BuyProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var array_product = JSON.parse(localStorage.getItem("products"));
    var index = localStorage.getItem("index_cart");

    if (index == null) {
        index = 0;
    }
    var count = 0;
    if (array_product != null) {
        for (var i = 0; i < index; i++) {
            if (id == array_product[i]) {
                count++;
            }
        }
    } else {
        array_product = [];
    }

    if (count == 0) {
        localStorage.setItem("index_cart", (parseInt(index) + 1));
        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

        array_product.push(id);
        localStorage.setItem("products", JSON.stringify(array_product));

        var price_total = 0;
        var cartItem = "";

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
                                        cartItem += "<div class='media'>" +
                                            "<a class='pull-left' style='padding-right: 13px;' href='product?id=" + data[i].id + "'>" +
                                                "<img class='media-object' src='"+ data[i].images[0].path +"' alt='image'  style='width: 80px;'/>" +
                                            "</a>" +
                                            "<div class='media-body'>" +
                                                sold_out  +
                                                "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='product?id=" + data[i].id + "'>" + data[i].name + "</a></h4>" +
                                                "<h5 style='margin-top: 18px; color: #000'>" + data[i].price + "₫</h5>" +
                                            "</div>" +
                                            "<a class='remove' onclick='removeProductFormCart(\""+ data[i].id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                                        "</div>";
                                        price_total += parseInt(data[i].price.replaceAll(',', ''));
                                    }
                                }
                            }
                            localStorage.setItem("products", JSON.stringify(array_product));
                            if (cartItem == "") {
                                document.getElementById("scrollbar_custom").innerHTML = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>"
                            } else {
                                document.getElementById("scrollbar_custom").innerHTML = cartItem;
                            }
                            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                        } else {
                            localStorage.setItem("index_cart", 0);
                        }
                    }
                })
            );
        }
    }
    window.location.href = "cart.html";
}

function showSuccessToast() {
    toast({
      title: "Thành Công!",
      message: "Bạn đã thêm sản phẩm vào giỏ thành công.",
      type: "success",
      duration: 3000
    });
}

function showErrorToast() {
    toast({
        title: "Thất bại!",
        message: "Khách iu đã thêm sản phẩm này vào giỏ rồi.",
        type: "error",
        duration: 3000
    });
}

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }



