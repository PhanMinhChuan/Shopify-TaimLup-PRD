window.addEventListener('load', (event) =>{
    var id = window.location.search.split('id=')[1];
    //var id = '1';
    fetch("http://103.173.154.17:8080/vintage/product/" + id).then(
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

                document.getElementById("product_name").innerHTML = data.name;
                if (data.size_model != "") {
                    document.getElementById("trademark").innerHTML = data.trademark + "　　Mẫu mang: " + data.size_model;
                } else {
                    document.getElementById("trademark").innerHTML = data.trademark;
                }
                document.getElementById("size_length").innerHTML = data.size_length;
                document.getElementById("size_waist").innerHTML = data.size_waist;
                document.getElementById("condition_percent").innerHTML = data.condition_percent;
                document.getElementById("size").innerHTML = "<li><a href='#!' class='swatch-violet' style='border: 1px solid black; background-color: white; text-align: center; padding: 9px;'>" + data.size +"</a></li>";
                document.getElementById("price").innerHTML = data.price;
                if (data.size_leg != '') {
                    document.getElementById("size_leg").innerHTML = "<div class='color-swatches'><span style='height: 28px; width: 130px;'>Ống quần:</span><p style='color: black;'>" + data.size_leg + "</p></div>";
                }
                document.getElementById("zoom-effect").innerHTML = slide;
                document.getElementById("thumb_images").innerHTML = thumb;
            }
        })
    );
});

window.addEventListener('popstate', function(event) {
    this.alert('alert');
}, false);

window.addEventListener('popstate', function (e) {
    var state = e.state;
    if (state !== null) {
        //load content with ajax
    }
});

function addProductToCart() {
    var id = window.location.search.split('id=')[1];
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
                                    "<h4 class='media-heading'><a href='#!'>" + JSON.parse(localStorage.getItem("products"))[i].product_name + "</a></h4>" +
                                    "<h5 style='margin-top: 25px; color: #000'>" + JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</h5>" +
                                "</div>" +
                                "<a class='remove' onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\")'><i class='tf-ion-close'></i></a>" +
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
                                                                        "<h4 class='media-heading'><a href='#!'>" + name + "</a></h4>" +
                                                                        "<h5 style='margin-top: 25px; color: #000'>" + price + "₫</h5>" +
                                                                    "</div>" +
                                                                    "<a class='remove' onclick='removeProductFormCart(1)'><i class='tf-ion-close'></i></a>" +
                                                                "</div>";
        document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(parseInt(JSON.parse(price.replaceAll(',', ''))));
    }
}


function BuyProductToCart() {
    var id = window.location.search.split('id=')[1];
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
                                                                        "<h4 class='media-heading'><a href='#!'>" + name + "</a></h4>" +
                                                                        "<h5 style='margin-top: 25px; color: #000'>" + price + "₫</h5>" +
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



