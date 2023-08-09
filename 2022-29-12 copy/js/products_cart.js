window.addEventListener('load', (event) =>{
    typePayment('cod');
    reloadProductCart();

    fetch("https://taimlup.com:8443/vintage/discounts").then(
        (response) => response.json().then((data) => {
            var listProduct = "";

            for (var i = 0; i < data.length; i++) {
                if (data[i] != null) {
                    let start_date = JSON.stringify(data[i].start_date);
                    start_date = start_date.slice(1,11);
                    let end_date = JSON.stringify(data[i].end_date);
                    end_date = end_date.slice(1,11);
                    var hr_discount = "<hr>";
                    if (i == data.length - 1) {
                        hr_discount = "";
                    }
                    
                    var status_code = "";
                    var status_radio = "";
                    if (new Date(data[i].start_date) <= new Date() && new Date() <= new Date(data[i].end_date)) {
                        status_code = "<span>Sử dụng</span>";
                        var discount_price = "null";
                        var discount_percent = "null";
                        if (data[i].discount_price != '') {
                            discount_price = data[i].discount_price;
                        }
                        if (data[i].discount_percent != '') {
                            discount_percent = data[i].discount_percent
                        } 
                        status_radio = "<input type='radio' style='margin-top: 10px; width: 96%; height: 1.6em;' name='choose_discount' id='"+ data[i].id +"' onclick='chooseDiscount(\"" + data[i].code  + "\", \"" + data[i].type + "\", \"" + discount_price + "\", \""+ discount_percent +"\")'>";
                    } else {
                        status_code = "<span>Đã hết hạn</span>";
                        status_radio = "";
                    }
                    listProduct += "<label for='"+ data[i].id +"' style='display: block; font-weight: 300 !important;'>" +
                                    "<div class='container mt-5'>" +
                                        "<div class='d-flex justify-content-center row'>" +
                                            "<div class='col-md-6'>" +
                                                "<div class='coupon p-3 bg-white'>" +
                                                    "<div class='row no-gutters'>" +
                                                        "<div class='border-right discount_custom' style='width: 41.66666667%; float: left;'>" +
                                                            "<div class='d-flex flex-column align-items-center'>" +
                                                                "<div class='d-flex flex-row justify-content-between off px-3 p-2'>" +
                                                                    "<span class='border border-success px-3 rounded code'>" + data[i].code +"</span>" +
                                                                "</div>" +
                                                            "</div>" +
                                                        "</div> " +
                                                        "<div class='discount_date_custom' style='width: 41.66666667%; float: left;'>" +
                                                            "<div>" +
                                                                "<div class='d-flex flex-row justify-content-end off'>" +
                                                                    status_code +
                                                                "</div>" +
                                                                "<div class='d-flex flex-row justify-content-between off px-3 p-2' style='margin-top: 6px;'>" +
                                                                    "<span class='border border-success px-3 rounded code'>" + start_date + "</span>　" +
                                                                    "<span class='border border-success px-3 rounded code'>" + end_date + "</span>" +
                                                                "</div>" +
                                                            "</div>" +
                                                        "</div>" +
                                                        "<div style='width: 8.33333333%; float: left;'>" +
                                                            status_radio +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</label>" +
                                hr_discount;

                }
            }
            if (listProduct == "") {
                listProduct = "Hiện tại chưa có chương trình khuyến mãi";
            }
            document.getElementById("discount_list").innerHTML = listProduct;
        })
    );
});

var ship = 30000;

function reloadProductCart() {
    if (document.getElementById('show_products_cart') != null) {
        var price_total = 0;

        if (localStorage.getItem("index_cart") != null) {
            document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
            var index = localStorage.getItem("index_cart");
            var array_product = JSON.parse(localStorage.getItem("products"));
            var array_id = [];
    
            if (index != null) {
                for (var i = 0; i < array_product.length; i++) {
                    if(array_product[i]) {
                        array_id.push(parseInt(array_product[i]));
                    }
                }
    
                var cartItem = "";
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
                                    sold_out = "<span class='bage-custom-cart_discount' style='z-index: 2;'>HẾT HÀNG</span>";
                                    }
                                    if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                                        var price = parseInt(data[i].price.replaceAll(',', ''));
                                        var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                                        reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                                        price_total += parseInt(price-int_reduced_price);
                                        var style = "style='margin-top: 0%;'";
                                        var style1 = "height: 26px;";
                                    } else {
                                        reduced_price = "<p style='font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                                        price_total += parseInt(data[i].price.replaceAll(',', ''));
                                        var style = "style='margin-top: 7%;'";
                                        var style1 = "";
                                    }
                                    cartItem += "<div class='row' style='padding: 10px 15px'>" + 
                                        "<div class='cart-custom' style='width: 25%; float: left;'>" + 
                                            "<div class='product-item'>" + 
                                                sold_out +
                                                "<img class='img-responsive' src='"+ data[i].images[0].path +"' alt='product-img' href='product?id=" + data[i].id +"'/>" + 
                                            "</div>" + 
                                        "</div>" + 
                                        "<div style='width: 60%; float: left; padding-left: 4%;'>" + 
                                            "<div class='single-product-details' style='height: 39px;'><a style='font-size: 20px; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 22px;' href='product?id=" + data[i].id + "'>" + data[i].name +"</a></div>" + 
                                            "<div class='single-product-details' style='margin-top: 2%; padding-top: 1px; " + style1 + "'>" + 
                                                "<p style='font-size: 12px; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</p>" + 
                                            "</div>" + 
                                            "<div class='single-product-details'>" + 
                                            reduced_price + 
                                            "</div>" + 
                                            "<div id='reduce_price_repo_1' class='single-product-details' " + style + ">" +
                                                "<button onclick='removeProductFormCart(\""+ data[i].id + "\"); reloadProductCart();' style='text-transform: uppercase; color: #e95144; font-weight: 700; letter-spacing: 0.05em; font-size: 11px; background-color: white ;border: 1px solid;' title='Xóa'><span>Xóa sản phẩm</span></button>" + 
                                            "</div>" + 
                                        "</div>" + 
                                    "</div>";
                                }
                              }
                            }
                            localStorage.setItem("products", JSON.stringify(array_product));
                            if (cartItem == "") {
                                document.getElementById("show_products_cart").innerHTML = "<br><p>Chưa có sản phẩm nào trong giỏ hàng. <br><a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p>"
                            } else {
                                document.getElementById("show_products_cart").innerHTML = cartItem;
                            }
                            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                            document.getElementById("total_price_cart").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                            var price_total_cart = parseInt(price_total) + parseInt($("#ship_price").text().replaceAll(',', ''));
                            if (price_total_cart < 0 || price_total == 0) {
                                price_total_cart = 0;
                            }
                            document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total_cart);
                          }
                        } else {
                            localStorage.setItem("index_cart", 0);
                        }
                    })
                );
            }
        } else {
            document.getElementById("show_products_cart").innerHTML = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
        }
    }
}

function useDiscount() {
    var code = document.getElementById("inputSearchAuto-3").value;
    var price_total = 0;
    if (code != '') {
        if (localStorage.getItem("index_cart") != null && localStorage.getItem("index_cart") > 0) {
            var price_total = 0;
            document.getElementById("inputSearchAuto-3").value = code;
    
            if (localStorage.getItem("index_cart") != null) {
                document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
                var index = localStorage.getItem("index_cart");
                var array_product = JSON.parse(localStorage.getItem("products"));
                var array_id = [];
        
                if (index != null) {
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
                                for (var i = 0; i < data.length; i++) {
                                  if (data[i] != null) {
                                    if (data[i].images[0] != null) {
                                        price_total += parseInt(data[i].price.replaceAll(',', ''));
                                    }
                                  }
                                }
                                var price_total_cart = parseInt(price_total) + parseInt($("#ship_price").text().replaceAll(',', ''));
                                if (price_total_cart < 0 || price_total == 0) {
                                    price_total_cart = 0;
                                }
                                document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total_cart);
                                return fetch("https://taimlup.com:8443/vintage/discount_check/" + code).then(
                                    (response) => response.json().then((data) => {
                                        if (data != null) {
                                            if (new Date(data.start_date) <= new Date() && new Date() <= new Date(data.end_date)) {
                                                if (data.type == 'freeship') {
                                                    document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                                                    document.getElementById("discount_price").innerHTML = "30,000₫";
                                                } else if (data.type == 'money') {
                                                    var discount_string = parseInt(data.discount_price.replaceAll(',', ''));
                                                    var total = price_total + ship - discount_string;

                                                    document.getElementById("discount_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(discount_string);
                                                    document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(total);
                                                } else if  (data.type == 'percent') {
                                                    var discount_string = parseInt(data.discount_percent);
                                                    var total = price_total + ship - price_total*(discount_string/100);
                            
                                                    document.getElementById("discount_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total*(discount_string/100));
                                                    document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(total);
                                                }
                                            } else {
                                                alert("Mã giảm giá đã hết hạn sử dụng!");
                                            }
                                        } else {
                                            alert("Mã giảm giá không hợp lệ!")
                                        }
                                    })
                                );
                              }
                            }
                        })
                    );
                }
            } else {
                document.getElementById("show_products_cart").innerHTML = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
            }
        }
    } else {
        alert("Xin nhập mã giảm giá!")
    }
}

function chooseDiscount(code, type, discount_price, discount_percent) {
    $('#exampleModalCenter').modal('hide');
    if (localStorage.getItem("index_cart") != null && localStorage.getItem("index_cart") > 0) {
        var price_total = 0;
        document.getElementById("inputSearchAuto-3").value = code;

        if (localStorage.getItem("index_cart") != null) {
            document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
            var index = localStorage.getItem("index_cart");
            var array_product = JSON.parse(localStorage.getItem("products"));
            var array_id = [];
    
            if (index != null) {
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
                            for (var i = 0; i < data.length; i++) {
                              if (data[i] != null) {
                                if (data[i].images[0] != null) {
                                    price_total += parseInt(data[i].price.replaceAll(',', ''));
                                }
                              }
                            }
                            var price_total_cart = parseInt(price_total) + parseInt($("#ship_price").text().replaceAll(',', ''));
                            if (price_total_cart < 0 || price_total == 0) {
                                price_total_cart = 0;
                            }
                            document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total_cart);

                            if (type == 'freeship') {
                                document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
                                document.getElementById("discount_price").innerHTML = "30,000₫";
                            } else if (type == 'money' && discount_price != "null") {
                                var discount_string = parseInt(discount_price.replaceAll(',', ''));
                                var total = price_total + ship - discount_string;
                        
                                document.getElementById("discount_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(discount_string);
                                document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(total);
                            } else if  (type == 'percent' && discount_percent != null) {
                                var discount_string = parseInt(discount_percent);
                                var total = price_total + ship - price_total*(discount_string/100);
                        
                                document.getElementById("discount_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total*(discount_string/100));
                                document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(total);
                            } else {
                                alert('Mã code không hợp lệ!');
                            }
                          }
                        }
                    })
                );
            }
        } else {
            document.getElementById("show_products_cart").innerHTML = "<p>Chưa có sản phẩm nào trong giỏ hàng. <a href='#' style='color:red'>Let go shopping</a> để ủng hộ chúng mình nào!</p><br>";
        }
    } else {
        alert('Chưa có sản phẩm trong giỏ, let go shopping để ủng hộ chúng mình nào!');
    }
}

var clicked = false;

function order_product(e) {
    e.preventDefault()
    if (!clicked) {
        clicked = true;
        var count = 0;

        if ($("#city option:selected").val() == "" || $("#district option:selected").val() == "" || $("#ward option:selected").val() == "") {
            alert('Xin vui lòng nhập Tỉnh/thành - Quận/huyện - Phường/xã của quý khách!');
            count++;
        }
    
        var product = new FormData();
        var array_id = [];
        var list_product = JSON.parse(localStorage.getItem("products"));

        if (count == 0) {
            if (list_product != null && list_product.length > 0) {
                for (var i = 0; i < list_product.length; i++) {
                    if(list_product[i]) {
                        array_id.push(parseInt(list_product[i]));
                    }
                }
        
                product.append('name', document.getElementById("name").value);
                product.append('phone', document.getElementById("phone").value);
                product.append('address', document.getElementById("address").value);
                product.append('address_detail', $("#city option:selected").text() + ", " + $("#district option:selected").text() +  ", " + $("#ward option:selected").text());
                product.append('note', document.getElementById("note").value);
                product.append('type', document.getElementById("type").value);
        
                var type_detail = "";
                if ($("#type_detail_ao option:selected").text() != '') {
                    type_detail = "";
                }
                if ($("#type_detail_quan option:selected").text() != '') {
                    type_detail = "";
                }
        
                product.append('type_detail', type_detail);
                product.append('date', moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
                product.append('voucher', document.getElementById("inputSearchAuto-3").value);
                product.append('price', document.getElementById("total_price_cart").innerHTML.replaceAll("&nbsp;₫", ''));
                product.append('price_discount', document.getElementById("price_total").innerHTML.replaceAll("&nbsp;₫", ''));
        
                var object = {};
                product.forEach(function(value, key){
                    object[key] = value;
                });
        
                object['list_id'] = array_id;
    
                fetch("https://taimlup.com:8443/vintage/order/create", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify(object) // This is your file object
                    })
                    .then((response) => response.json().then((data) => {
                        if (data != null) {
                            if (data.length != 0) {
                                var messsage = "Sản phẩm bên dưới đã có người đặt mất rồi, bạn xóa những món bên dưới rồi đặt hàng lại nha: \n";
                                for (var i = 0; i < data.length; i++) {
                                    messsage += '→ ' + data[i].name + '\n';
                                }
                                alert(messsage);
                                clicked = false;
                            } else {
                                alert("Đặt hàng thành công, chúng mình sẽ liên lạc bên bạn sớm nhất!");
                                clicked = false;
                                localStorage.clear();
                                window.location.href="/";
                            }
                        }
                    })
                );
            } else {
                alert('Giỏ hàng đang trống!');
                clicked = false;
            }
        } else {
            clicked = false;
        }
    }

}
