window.addEventListener('load', (event) =>{
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    //var id = '1';
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

                if (data.wait_buy == 1) {
                   document.getElementById('sold-out').innerHTML = "<span class='bage-custom' style='z-index: 2;'>HẾT HÀNG</span>";
                }

                document.getElementById("product_name").innerHTML = data.name;
                if (data.size_model != "") {
                    document.getElementById("size_model").innerHTML = "Mẫu mang: " + data.size_model;
                }
                if (data.size_length != '') {
                    document.getElementById("check_size_length").innerHTML = "<span style='height: 28px; width: 130px;'>Dài:</span><p style='color: black;'>"+ data.size_length +"</p><br>";
                } else {
                    document.getElementById("check_size_length").style.display = 'none';
                }
                if (data.size_waist != '') {
                    document.getElementById("check_size_waist").innerHTML = "<span style='height: 28px; width: 130px;'>Độ rộng eo:</span><p style='color: black;'>"+ data.size_waist +"</p><br>";
                } else {
                    document.getElementById("check_size_waist").style.display = 'none';
                }
                if (data.condition_percent != '') {
                    document.getElementById("check_condition_percent").innerHTML = "<span style='height: 28px; width: 130px;'>Độ mới (%):</span><p style='color: black;'>"+ data.condition_percent +"</p>";
                } else {
                    document.getElementById("check_condition_percent").style.display = 'none';
                }
                document.getElementById("size").innerHTML = "<li><a href='#!' class='swatch-violet' style='border: 1px solid black; background-color: white; text-align: center; padding: 9px;'>" + data.size +"</a></li>";
                document.getElementById("price").innerHTML = data.price;
                if (data.size_leg != '') {
                    document.getElementById("size_leg").innerHTML = "<div class='color-swatches'><span style='height: 28px; width: 130px;'>Ống quần:</span><p style='color: black;'>" + data.size_leg + "</p></div>";
                }
                document.getElementById("zoom-effect").innerHTML = slide;
                document.getElementById("thumb_images").innerHTML = thumb;
                if (data.wait_buy == 1) {
                    document.getElementById('addToCard').style.display ='none';
                    document.getElementById('buyNow').style.display ='none';
                }

                return fetch("https://taimlup.com:8443/vintage/products_type/" + data.type).then(
                    (response) => response.json().then((data) => {
                        var listProduct = "<div class='slider_2 responsive'>";

                        for (var i = 0; i <= data.length; i++) {
                            if (data[i] != null) {
                                if (data[i].id != id) {
                                    var sold = "";
                                    if (data[i].wait_buy == 0) {
                                        sold = "<img class='img-responsive img-rev' src='" + data[i].images[0].path + "' alt='product-img' href='product' style='max-height: 180px;' />" + "<img class='img-responsive img-rev' src='" + data[i].images[1].path + "' alt='product-img' href='product'  style='max-height: 180px;'/>";
                                    } else {
                                        sold = "<span class='bage' style='z-index: 1;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive img-rev' src='" + data[i].images[0].path + "' alt='product-img' href='product'/ style='max-height: 180px;' >" + "<img class='img-responsive img-rev' src='" + data[i].images[1].path + "' alt='product-img' href='product' style='max-height: 180px;'/></div>";
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
                                                                "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
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
                    })
                );
            }
        })
    );
});

function addProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var index = localStorage.getItem("index_cart");
    var name = $("#product_name").text();
    var size = $("#size").text();
    var price = $("#price").text();
    var src_1 = $("#1").attr('src')
    var src_2 = $("#2").attr('src')

    if (index != null) {
        var count = 0;
        for (var i = 0; i < index; i++) {
            if (name == JSON.parse(localStorage.getItem("products"))[i].product_name) {
                count++;
            }
        }
        if (count == 0) {
            showSuccessToast();
            localStorage.setItem("index_cart", (parseInt(index) + 1));
            document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

            var array_product = JSON.parse(localStorage.getItem("products"));
            array_product.push({product_id: id, product_name: name, product_size: size, product_price: price, product_src_1: src_1, product_src_2: src_2});
        
            localStorage.setItem("products", JSON.stringify(array_product));
            var price_total = 0;
            var cartItem = "";
            for (var i = 0; i <= index; i++) {
                cartItem += "<div class='media'>" +
                                "<a class='pull-left' style='padding-right: 13px;'>" +
                                    "<img class='media-object' src='"+ JSON.parse(localStorage.getItem("products"))[i].product_src_1 +"' alt='image'  style='width: 80px;'/>" +
                                "</a>" +
                                "<div class='media-body'>" +
                                    // "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>" +
                                    "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + JSON.parse(localStorage.getItem("products"))[i].product_name + "</a></h4>" +
                                    "<h5 style='margin-top: 18px; color: #000'>" + JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</h5>" +
                                "</div>" +
                                "<a class='remove' onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                            "</div>";
                price_total += parseInt(JSON.parse(localStorage.getItem("products"))[i].product_price.replaceAll(',', ''));
            }
            document.getElementById("scrollbar_custom").innerHTML = cartItem;
            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
        } else {
            showErrorToast();
        }
    } else {
        showSuccessToast();
        localStorage.setItem("index_cart", 1);
        var product = [{product_id: id, product_name: name, product_size: size, product_price: price, product_src_1: src_1, product_src_2: src_2}];
        localStorage.setItem("products", JSON.stringify(product));

        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

        document.getElementById("scrollbar_custom").innerHTML = "<div class='media'>" +
                                                                    "<a class='pull-left' style='padding-right: 13px;'>" +
                                                                        "<img class='media-object' src='"+ src_1 +"' alt='image'  style='width: 80px;'/>" +
                                                                    "</a>" +
                                                                    "<div class='media-body'>" +
                                                                        // "<span class='bage-custom-cart' style='z-index: 2;'>HẾT HÀNG</span>" +
                                                                        "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + name + "</a></h4>" +
                                                                        "<h5 style='margin-top: 18px; color: #000'>" + price + "₫</h5>" +
                                                                    "</div>" +
                                                                    "<a class='remove' onclick='removeProductFormCart(1)'><i class='tf-ion-close'></i></a>" +
                                                                "</div>";
        document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(parseInt(JSON.parse(price.replaceAll(',', ''))));
    }
}


function BuyProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var index = localStorage.getItem("index_cart");
    var name = $("#product_name").text();
    var size = $("#size").text();
    var price = $("#price").text();
    var src_1 = $("#1").attr('src')
    var src_2 = $("#2").attr('src')

    if (index != null) {
        var count = 0;
        for (var i = 0; i < index; i++) {
            if (name == JSON.parse(localStorage.getItem("products"))[i].product_name) {
                count++;
            }
        }
        if (count == 0) {
            localStorage.setItem("index_cart", (parseInt(index) + 1));
            document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

            var array_product = JSON.parse(localStorage.getItem("products"));
            array_product.push({product_id: parseInt(index)+1, product_name: name, product_size: size, product_price: price, product_src_1: src_1, product_src_2: src_2});
        
            localStorage.setItem("products", JSON.stringify(array_product));
            var price_total = 0;
            var cartItem = "";
            for (var i = 0; i <= index; i++) {
                cartItem += "<div class='media'>" +
                                "<a class='pull-left' style='padding-right: 13px;'>" +
                                    "<img class='media-object' src='"+ JSON.parse(localStorage.getItem("products"))[i].product_src_1 +"' alt='image'  style='width: 80px;'/>" +
                                "</a>" +
                                "<div class='media-body'>" +
                                    "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + JSON.parse(localStorage.getItem("products"))[i].product_name + "</a></h4>" +
                                    "<h5 style='margin-top: 18px; color: #000'>" + JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</h5>" +
                                "</div>" +
                                "<a class='remove' onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\"); reloadProductCart();'><i class='tf-ion-close'></i></a>" +
                            "</div>";
                price_total += parseInt(JSON.parse(localStorage.getItem("products"))[i].product_price.replaceAll(',', ''));
            }
            document.getElementById("scrollbar_custom").innerHTML = cartItem;
            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
        }
    } else {
        localStorage.setItem("index_cart", 1);
        var product = [{product_id: id, product_name: name, product_size: size, product_price: price, product_src_1: src_1, product_src_2: src_2}];
        localStorage.setItem("products", JSON.stringify(product));

        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");

        document.getElementById("scrollbar_custom").innerHTML = "<div class='media'>" +
                                                                    "<a class='pull-left' style='padding-right: 13px;'>" +
                                                                        "<img class='media-object' src='"+ src_1 +"' alt='image'  style='width: 80px;'/>" +
                                                                    "</a>" +
                                                                    "<div class='media-body'>" +
                                                                        "<h4 class='media-heading' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 22px;'><a href='#!'>" + name + "</a></h4>" +
                                                                        "<h5 style='margin-top: 18px; color: #000'>" + price + "₫</h5>" +
                                                                    "</div>" +
                                                                    "<a class='remove' onclick='removeProductFormCart(1)'><i class='tf-ion-close'></i></a>" +
                                                                "</div>";
        document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(parseInt(JSON.parse(price.replaceAll(',', ''))));
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



