window.addEventListener('load', (event) =>{
    typePayment('cod');
    reloadProductCart();
});

var price_total = 0;
var ship = 30000;

function reloadProductCart() {
    if (localStorage.getItem("index_cart") != null) {
        document.getElementById("lblCartCount").innerHTML = localStorage.getItem("index_cart");
        var index = localStorage.getItem("index_cart");
        if (index != null) {
            
            var cartItem = "";
            for (var i = 0; i < index; i++) {
                cartItem += "<div class='row' style='padding: 10px 15px'>" + 
                                "<div class='cart-custom' style='width: 25%; float: left;'>" + 
                                    "<div class='product-item'>" + 
                                        "<img class='img-responsive' src='"+ JSON.parse(localStorage.getItem("products"))[i].product_src_1+"' alt='product-img' href='product.html?id=" + JSON.parse(localStorage.getItem("products"))[i].product_id +"'/>" + 
                                    "</div>" + 
                                "</div>" + 
                                "<div style='width: 60%; float: left; padding-left: 4%;'>" + 
                                    "<a style='font-size: 20px; font-weight: 500;' href='product.html?id=" + JSON.parse(localStorage.getItem("products"))[i].product_id + "'>" + JSON.parse(localStorage.getItem("products"))[i].product_name +"</a>" + 
                                    "<div class='single-product-details' style='margin-top: 2%;'>" + 
                                        "<p style='font-size: 12px;'>Kích thước/Size: " + JSON.parse(localStorage.getItem("products"))[i].product_size + "</p>" + 
                                    "</div>" + 
                                    "<div class='single-product-details' style='margin-top: 5%;'>" + 
                                        "<p style='font-size: 17px; font-weight: 600; color: #333'>"+ JSON.parse(localStorage.getItem("products"))[i].product_price + "₫</p>" + 
                                    "</div>" + 
                                    "<div class='single-product-details' style='margin-top: 7%;'>" + 
                                        "<button onclick='removeProductFormCart(\""+ JSON.parse(localStorage.getItem("products"))[i].product_id + "\"); reloadProductCart();' style='text-transform: uppercase; color: #e95144; font-weight: 700; letter-spacing: 0.05em; font-size: 11px; background-color: white ;border: 1px solid;' title='Xóa'><span>Xóa sản phẩm</span></button>" + 
                                    "</div>" + 
                                "</div>" + 
                            "</div>";
                price_total += parseInt(JSON.parse(localStorage.getItem("products"))[i].product_price.replaceAll(',', ''));
            }
            if (cartItem == "") {
                cartItem = "<br><h3 style='font-weight: 300; color: red;'>Giỏ hàng trống!</h3>"
            }
            document.getElementById("show_products_cart").innerHTML = cartItem;
            document.getElementById("total_price").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
            document.getElementById("total_price_cart").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total);
            var price_total_cart = parseInt(price_total) + parseInt($("#ship_price").text().replaceAll(',', ''));
            if (price_total_cart < 0 || price_total == 0) {
                price_total_cart = 0;
            }
            document.getElementById("price_total").innerHTML = new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price_total_cart);
        }
    }
}

function useDiscount() {
    var code = document.getElementById("inputSearchAuto-3").value;
    if (code != null) {
        fetch("http://103.173.154.17:8080/vintage/discount_check/" + code).then(
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
    } else {
        alert("Xin nhập mã giảm giá!")
    }
}

function order_product() {
    alert ("Đặt Hàng Thành Công");
}