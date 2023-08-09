window.addEventListener('load', (event) =>{
    const urlParams = new URLSearchParams(window.location.search);
    var type = urlParams.get('type');
    var type_detail = urlParams.get('type_detail');
    var search = urlParams.get('search');

    if (type == null && type_detail == null && search == null) {
        fetch("https://taimlup.com:8443/vintage/products/random?page=0&size=20").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        var sold = "";
                        if (data[i].wait_buy == 0) {
                            sold = "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/>";
                        } else {
                            sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/></div>";
                        }
                        var reduced_price = "";
                        if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                            var price = parseInt(data[i].price.replaceAll(',', ''));
                            var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                            reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                        } else {
                            reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                        }
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            sold +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        reduced_price +
                                                        "<div class='product-content'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                if (data.length < 20) {
                    $(".load-more").css('visibility', 'hidden');
                } else if (data.length == 20) {
                    $(".load-more").css('visibility', '');
                }
            })
        );
    } else if (type != null) {
        fetch("https://taimlup.com:8443/vintage/products_type/" + type + "?page=0&size=20").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        var sold = "";
                        if (data[i].wait_buy == 0) {
                            sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                        } else {
                            sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
                        }
                        var reduced_price = "";
                        if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                            var price = parseInt(data[i].price.replaceAll(',', ''));
                            var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                            reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                        } else {
                            reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                        }
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            sold +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        reduced_price +
                                                        "<div class='product-content'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                if (listProduct == "") {
                    listProduct = "<p style='color: red; font-size: 25px;'>Hiện tại chúng mình chưa có sản phẩm theo yêu cầu của bạn</p>";
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;
                reloadCombo();
                        
                if (data.length < 20) {
                    $(".load-more").css('visibility', 'hidden');
                } else if (data.length == 20) {
                    $(".load-more").css('visibility', '');
                }
            })
        );

        document.getElementById("show_products").value = type;
        document.getElementById("show_products_repo").value = type;
    } else if (type_detail != null) {
        fetch("https://taimlup.com:8443/vintage/products_type_detail/" + type_detail + "?page=0&size=20").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        var sold = "";
                        if (data[i].wait_buy == 0) {
                            sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                        } else {
                            sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
                        }
                        var reduced_price = "";
                        if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                            var price = parseInt(data[i].price.replaceAll(',', ''));
                            var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                            reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                        } else {
                            reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                        }
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            sold +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        reduced_price +
                                                        "<div class='product-content'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                if (listProduct == "") {
                    listProduct = "<p style='color: red; font-size: 25px;'>Hiện tại chúng mình chưa có sản phẩm theo yêu cầu của bạn</p>";
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;
                        
                if (data.length < 20) {
                    $(".load-more").css('visibility', 'hidden');
                } else if (data.length == 20) {
                    $(".load-more").css('visibility', '');
                }
            })
        );
        if (type_detail.indexOf('ao') == 0) {
            document.getElementById("show_products").value = 'ao';
            document.getElementById("show_products_repo").value = 'ao';
            reloadCombo();
            document.getElementById("show_products_detail_ao").value = type_detail;
            document.getElementById("show_products_detail_ao_repo").value = type_detail;
        } else if (type_detail.indexOf('quan') == 0) {
            document.getElementById("show_products").value = 'quan';
            document.getElementById("show_products_repo").value = 'quan';
            reloadCombo();
            document.getElementById("show_products_detail_quan").value = type_detail;
            document.getElementById("show_products_detail_quan_repo").value = type_detail;
        }
    } else if (search != null) {
        fetch("https://taimlup.com:8443/vintage/product/search/all/" + search + "?page=0&size=20").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        var sold = "";
                        if (data[i].wait_buy == 0) {
                            sold = "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/>";
                        } else {
                            sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/></div>";
                        }
                        var reduced_price = "";
                        if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                            var price = parseInt(data[i].price.replaceAll(',', ''));
                            var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                            reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                        } else {
                            reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                        }
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            sold +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        reduced_price +
                                                        "<div class='product-content'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                if (data.length < 20) {
                    $(".load-more").css('visibility', 'hidden');
                } else if (data.length == 20) {
                    $(".load-more").css('visibility', '');
                }
            })
        );
        if (localStorage.getItem("search_value") != null) {
            document.getElementById('search_tag').innerHTML = "<p class='tag' onclick='removeSearch();'>"+localStorage.getItem("search_value")+"<span style='font-size=25px; color: black;'>　X</span></p>";
            document.getElementById('search_tag_repo').innerHTML = "<p class='tag' onclick='removeSearch();'>"+localStorage.getItem("search_value")+"<span style='font-size=25px; color: black;'>　X</span></p>";
        }
    }
    if (search == null) {
        localStorage.removeItem("search_value");
    }
});

var count = 0;

$("body").on('click touchstart', '.load-more', function (e) {
    e.preventDefault();
    $(".load-more-col:hidden").slice(0, 10).slideDown();
    if ($(".load-more-col:hidden").length == 0) {

        count++;

        var price_type = document.getElementById('show_by_price').value;
        if (price_type == '') {
            price_type = document.getElementById('show_by_price_repo').value;
        }

        var size_type = document.getElementById('show_by_size').value;
        if (size_type == '') {
            size_type = document.getElementById('show_by_size_repo').value;
        }

        var type = document.getElementById('show_products').value;
        if (type == '') {
            type = document.getElementById('show_products_repo').value;
        }

        var type_detail = "";

        if (type == 'ao') {
            type_detail = document.getElementById('show_products_detail_ao').value;
            if (type_detail == '') {
                type_detail = document.getElementById('show_products_detail_ao_repo').value;
            }
        } else if (type == 'quan') {
            type_detail = document.getElementById('show_products_detail_quan').value;
            if (type_detail == '') {
                type_detail = document.getElementById('show_products_detail_quan_repo').value;
            }
        }

        var search = window.location.search.split('search=')[1];

        if (search == null) {
            fetch("https://taimlup.com:8443/vintage/products/combobox?page=" + count + "&size=20&type=" + type + '&type_detail=' + type_detail + '&order_by=' + price_type + '&size_choose=' + size_type + '&search=').then(
                (response) => response.json().then((data) => {
                    var listProduct = "";
    
                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] != null) {
                            var sold = "";
                            if (data[i].wait_buy == 0) {
                                sold = "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/>";
                            } else {
                                sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/></div>";
                            }
                            var reduced_price = "";
                            if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                                var price = parseInt(data[i].price.replaceAll(',', ''));
                                var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                                reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                            } else {
                                reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                            }
                            listProduct += "<div class='load-more-col responsive-list'>" +
                                                "<div class='product-item' style='padding: 2%'>" +
                                                        "<a href='product?id=" + data[i].id + "' >" +
                                                            "<div class='product-thumb hover-switch'>" +
                                                                sold +
                                                            "</div>" +
                                                        "</a>" +
                                                        "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                            "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                            "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                            reduced_price +
                                                            "<div class='product-content'>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                        }
                    }
                    document.getElementById("showProductAPI").innerHTML = document.getElementById("showProductAPI").innerHTML + listProduct;
                            
                    if (data.length < 20) {
                        $(".load-more").css('visibility', 'hidden');
                    } else if (data.length == 20) {
                        $(".load-more").css('visibility', '');
                    }
                })
            );
        } else {
            fetch("https://taimlup.com:8443/vintage/product/search/all/" + search + "?page=" + count + "&size=20").then(
                (response) => response.json().then((data) => {
                    var listProduct = "";
    
                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] != null) {
                            var sold = "";
                            if (data[i].wait_buy == 0) {
                                sold = "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/>";
                            } else {
                                sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/></div>";
                            }
                            var reduced_price = "";
                            if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                                var price = parseInt(data[i].price.replaceAll(',', ''));
                                var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                                reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                            } else {
                                reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                            }
                            listProduct += "<div class='load-more-col responsive-list'>" +
                                                "<div class='product-item' style='padding: 2%'>" +
                                                        "<a href='product?id=" + data[i].id + "' >" +
                                                            "<div class='product-thumb hover-switch'>" +
                                                                sold +
                                                            "</div>" +
                                                        "</a>" +
                                                        "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                            "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                            "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                            reduced_price +
                                                            "<div class='product-content'>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                        }
                    }
                    document.getElementById("showProductAPI").innerHTML = document.getElementById("showProductAPI").innerHTML + listProduct;
                            
                    if (data.length < 20) {
                        $(".load-more").css('visibility', 'hidden');
                    } else if (data.length == 20) {
                        $(".load-more").css('visibility', '');
                    }
                })
            );
        }
    }
});

function changeListProduct(valType) {
    var type = "";

    document.getElementById("show_by_price").value = '';
    document.getElementById("show_by_price_repo").value = '';

    if (valType == 1) {
        type = document.getElementById("show_products").value;
    } else if (valType ==2) {
        type = document.getElementById("show_products_repo").value;
    }

    if (type == 'all') {
        window.location.href="/vintage";
    } else if (type != "") {
        if (valType == 1) {
            window.location.href= $("#show_products option:selected")[0].id;
        } else if (valType ==2) {
            window.location.href= $("#show_products_repo option:selected")[0].id;
        }
    }
}

function changeListProductByPrice() {
    
    var price_type = document.getElementById('show_by_price').value;
    if (price_type == '') {
        price_type = document.getElementById('show_by_price_repo').value;
    }

    var size_type = document.getElementById('show_by_size').value;
    if (size_type == '') {
        size_type = document.getElementById('show_by_size_repo').value;
    }

    var type = document.getElementById('show_products').value;
    if (type == '') {
        type = document.getElementById('show_products_repo').value;
    }

    var type_detail = "";
    if (type == 'ao') {
        type_detail = document.getElementById('show_products_detail_ao').value;
        if (type_detail == '') {
            type_detail = document.getElementById('show_products_detail_ao_repo').value;
        }
    } else if (type == 'quan') {
        type_detail = document.getElementById('show_products_detail_quan').value;
        if (type_detail == '') {
            type_detail = document.getElementById('show_products_detail_quan_repo').value;
        }
    }

    var search = window.location.search.split('search=')[1];
    if (search == undefined) {
        search = "";
    }

    fetch("https://taimlup.com:8443/vintage/products/combobox?page=0&size=20&type=" + type + '&type_detail=' + type_detail + '&order_by=' + price_type + '&size_choose=' + size_type + '&search=' + search).then(
        (response) => response.json().then((data) => {
            var listProduct = "";

            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null) {
                    var sold = "";
                    if (data[i].wait_buy == 0) {
                        sold = "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/>";
                    } else {
                        sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive data-lazy' src='" + data[i].images[0].path + "' alt='product-img' href='product' loading='lazy'/>" + "<img class='img-responsive data-lazy' src='" + data[i].images[1].path + "' alt='product-img' href='product' loading='lazy'/></div>";
                    }
                    var reduced_price = "";
                    if (data[i].reduced_price != '' && data[i].reduced_price != null) {
                        var price = parseInt(data[i].price.replaceAll(',', ''));
                        var int_reduced_price = parseInt(data[i].reduced_price.replaceAll(',', ''));
                        reduced_price = "<span style='text-decoration: line-through;'>" + data[i].price + "₫</span><p style='margin-top: 1px; font-weight: 600; font-size: 19px; color: red'>" + new Intl.NumberFormat('vi-VN', {style : 'currency', currency : 'VND'}).format(price-int_reduced_price).replaceAll('.',',') + "</p>";
                    } else {
                        reduced_price = "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>";
                    }
                    listProduct += "<div class='load-more-col responsive-list'>" +
                                        "<div class='product-item' style='padding: 2%'>" +
                                                "<a href='product?id=" + data[i].id + "' >" +
                                                    "<div class='product-thumb hover-switch'>" +
                                                        sold +
                                                    "</div>" +
                                                "</a>" +
                                                "<div class='div_repo' style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                    "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                    "<span style='font-weight: 400; font-size: 11px; color: #666; display: inline-block;width: 100%;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                    reduced_price +
                                                    "<div class='product-content'>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>";
                }
            }
            if (listProduct == "") {
                listProduct = "<p style='color: red; font-size: 25px;'>Hiện tại chúng mình chưa có sản phẩm theo yêu cầu của bạn</p>";
            }
            document.getElementById("showProductAPI").innerHTML = listProduct;

            count = 0;
                    
            if (data.length < 20) {
                $(".load-more").css('visibility', 'hidden');
            } else if (data.length == 20) {
                $(".load-more").css('visibility', '');
            }
        })
    );
}

function reloadCombo () {
    document.getElementById('show_products_detail_ao').value = "";
    document.getElementById('show_products_detail_ao_repo').value = "";

    document.getElementById('show_products_detail_quan').value = "";
    document.getElementById('show_products_detail_quan_repo').value = "";

    document.getElementById('show_by_size').value  = "";
    document.getElementById('show_by_size_repo').value = "";

    document.getElementById('show_by_price').value = "";
    document.getElementById('show_by_price_repo').value = "";

    var type = document.getElementById('show_products').value;
    if (type == '') {
        type = document.getElementById('show_products_repo').value;
    }

    if (type == "ao") {
        document.getElementById("type_ao").style.display = 'block';
        document.getElementById("type_ao_repo").style.display = 'block';
        document.getElementById("type_quan").style.display = 'none';
        document.getElementById("type_quan_repo").style.display = 'none';
    } else if (type == "quan") {
        document.getElementById("type_ao").style.display = 'none';
        document.getElementById("type_ao_repo").style.display = 'none';
        document.getElementById("type_quan").style.display = 'block';
        document.getElementById("type_quan_repo").style.display = 'block';
    } else {
        document.getElementById("type_ao").style.display = 'none';
        document.getElementById("type_ao_repo").style.display = 'none';
        document.getElementById("type_quan").style.display = 'none';
        document.getElementById("type_quan_repo").style.display = 'none';
    }
}

function removeSearch() {
    localStorage.removeItem("search_value");
    window.location.href= '/vintage';
}

function changeURL(valType) {
    var search = window.location.search.split('search=')[1];
    if (search == undefined || search == '') {
        var type = "";

        if (valType == 1) {
            type = document.getElementById("show_products").value;
            var type_detail = "";
            if (type == 'ao') {
                type_detail = document.getElementById('show_products_detail_ao').value;
            } else if (type == 'quan') {
                type_detail = document.getElementById('show_products_detail_quan').value;
            }
        } else if (valType ==2) {
            type = document.getElementById("show_products_repo").value;
            if (type == 'ao') {
                type_detail = document.getElementById('show_products_detail_ao_repo').value;
            } else if (type == 'quan') {
                type_detail = document.getElementById('show_products_detail_quan_repo').value;
            }
        }
    
        if (type == '') {
            window.location.href="/vintage";
        } else if (type_detail != "" && type_detail != undefined) {
            window.location.href="/vintage?type_detail="+type_detail;
        } else if (type != "" && type != undefined) {
            window.location.href="/vintage?type="+type;
        }

    }


}