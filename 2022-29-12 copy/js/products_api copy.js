window.addEventListener('load', (event) =>{
    var type = window.location.search.split('type=')[1];
    var type_detail = window.location.search.split('type_detail=')[1];

    if (type == null && type_detail == null) {
        fetch("https://taimlup.com:8443/vintage/products?page=0&size=20").then(
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
                                                        "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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

        document.getElementById("show_products").value = 'all';
        document.getElementById("show_products_repo").value = 'all';
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
                                                        "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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

        document.getElementById("show_products").value = type;
        document.getElementById("show_products_repo").value = type;
    } else if (type_detail != null) {
        fetch("https://taimlup.com:8443/vintage/products_type_detail/" + type_detail + "?page=0&size=20").then(
            (response) => response.json().then((data) => {
                var listProduct = "";
                var array_product = [];

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        var sold = "";
                        if (data[i].wait_buy == 0) {
                            sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                        } else {
                            sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                        "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("show_products").value = type_detail;
                document.getElementById("show_products_repo").value = type_detail;
                document.getElementById("showProductAPI").innerHTML = listProduct;
                        
                if (data.length < 20) {
                    $(".load-more").css('visibility', 'hidden');
                } else if (data.length == 20) {
                    $(".load-more").css('visibility', '');
                }
            })
        );
    }
});

var pageAll = 0;
var pageType = 0;
var pageTypeDetail = 0;
var pageDESC = 0;
var pageASC = 0;

$("body").on('click touchstart', '.load-more', function (e) {
    e.preventDefault();
    $(".load-more-col:hidden").slice(0, 10).slideDown();
    if ($(".load-more-col:hidden").length == 0) {
        var type = document.getElementById("show_products").value;
        if (type == '') {
            type = document.getElementById('show_products_repo').value;
        }

        var type_detail = window.location.search.split('type_detail=')[1];

        var price_type = document.getElementById('show_by_price').value;
        if (price_type == '') {
            price_type = document.getElementById('show_by_price_repo').value;
        }
    
        var type = document.getElementById('show_products').value;
        var type_detail = window.location.search.split('type_detail=')[1];

        if (price_type == 'desc') {
            pageDESC++;
            pageASC = 0;
            if (type == 'all') {
                fetch("https://taimlup.com:8443/vintage/products/desc?page=" + pageDESC +"&size=20").then(
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
                document.getElementById("show_products").value = 'all';
                document.getElementById("show_products_repo").value = 'all';
            } else if (type_detail != null) {
                fetch("https://taimlup.com:8443/vintage/products_type_detail/desc/" + type_detail + "?page=" + pageDESC +"&size=20").then(
                    (response) => response.json().then((data) => {
                        var listProduct = "";
                        var array_product = [];
        
                        for (var i = 0; i <= data.length; i++) {
                            if (data[i] != null) {
                                var sold = "";
                                if (data[i].wait_buy == 0) {
                                    sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                                } else {
                                    sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                                "<div class='product-content'>" +
                                                            "</div>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>";
                            }
                        }
                        document.getElementById("show_products").value = type_detail;
                        document.getElementById("show_products_repo").value = type_detail;
                        document.getElementById("showProductAPI").innerHTML = document.getElementById("showProductAPI").innerHTML + listProduct;
                                                
                        if (data.length < 20) {
                            $(".load-more").css('visibility', 'hidden');
                        } else if (data.length == 20) {
                            $(".load-more").css('visibility', '');
                        }
                    })
                );
            } else if (type != null) {
                fetch("https://taimlup.com:8443/vintage/products_type/desc/" + type + "?page=" + pageDESC +"&size=20").then(
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
        
                document.getElementById("show_products").value = type;
                document.getElementById("show_products_repo").value = type;
            }
        } else if (price_type == 'asc') {
            pageDESC = 0;
            pageASC++;
            if (type == 'all') {
                fetch("https://taimlup.com:8443/vintage/products/asc?page=" + pageASC +"&size=20").then(
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
        
                document.getElementById("show_products").value = 'all';
                document.getElementById("show_products_repo").value = 'all';
            } else if (type_detail != null) {
                fetch("https://taimlup.com:8443/vintage/products_type_detail/asc/" + type_detail + "?page=" + pageASC +"&size=20").then(
                    (response) => response.json().then((data) => {
                        var listProduct = "";
                        var array_product = [];
        
                        for (var i = 0; i <= data.length; i++) {
                            if (data[i] != null) {
                                var sold = "";
                                if (data[i].wait_buy == 0) {
                                    sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                                } else {
                                    sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                                "<div class='product-content'>" +
                                                            "</div>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>";
                            }
                        }
                        if (type_detail.indexOf('ao') == 0) {
                            document.getElementById("show_products").value = 'ao';
                            document.getElementById("show_products_repo").value = 'ao';
                        } else if (type_detail.indexOf('quan') == 0) {
                            document.getElementById("show_products").value = 'quan';
                            document.getElementById("show_products_repo").value = 'quan';
                        }
                        document.getElementById("showProductAPI").innerHTML = document.getElementById("showProductAPI").innerHTML + listProduct;

                        if (data.length < 20) {
                            $(".load-more").css('visibility', 'hidden');
                        } else if (data.length == 20) {
                            $(".load-more").css('visibility', '');
                        }
                    })
                );
            } else if (type != null) {
                fetch("https://taimlup.com:8443/vintage/products_type/asc/" + type + "?page=" + pageASC +"&size=20").then(
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
                                                                "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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

                document.getElementById("show_products").value = type;
                document.getElementById("show_products_repo").value  = type;
            }
        }  else if (type == 'all') {
            pageAll++;
            pageType = 0;
            pageTypeDetail = 0;

            fetch("https://taimlup.com:8443/vintage/products?page="+ pageAll +'&size=20').then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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

            document.getElementById("show_products").value = 'all';
            document.getElementById("show_products_repo").value = 'all';
        } else if (type != null) {
            pageAll = 0;
            pageType++;
            pageTypeDetail = 0;

            fetch("https://taimlup.com:8443/vintage/products_type/" + type + "?page="+ pageType +"&size=20").then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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

            document.getElementById("show_products").value = type;
            document.getElementById("show_products_repo").value = type;
        } else if (type_detail != null) {
            pageAll = 0;
            pageType = 0;
            pageTypeDetail++;

            fetch("https://taimlup.com:8443/vintage/products_type_detail/" + type_detail + "?page="+ pageTypeDetail +"&size=20").then(
                (response) => response.json().then((data) => {
                    var listProduct = "";
                    var array_product = [];

                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] != null) {
                            var sold = "";
                            if (data[i].wait_buy == 0) {
                                sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                            } else {
                                sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                            "<div class='product-content'>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                        }
                    }
                    document.getElementById("show_products").value = type_detail;
                    document.getElementById("show_products_repo").value = type_detail;
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
    var type_detail = window.location.search.split('type_detail=')[1];

    if (price_type == 'desc') {
        if (type == 'all') {
            fetch("https://taimlup.com:8443/vintage/products/desc?page=0&size=20&size_choose="+ size_type).then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
            document.getElementById("show_products").value = 'all';
            document.getElementById("show_products_repo").value = 'all';
        } else if (type_detail != null) {
            fetch("https://taimlup.com:8443/vintage/products_type_detail/desc/" + type_detail +"?page=0&size=20&size_choose="+ size_type).then(
                (response) => response.json().then((data) => {
                    var listProduct = "";
                    var array_product = [];
    
                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] != null) {
                            var sold = "";
                            if (data[i].wait_buy == 0) {
                                sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                            } else {
                                sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                            "<div class='product-content'>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                        }
                    }
                    document.getElementById("show_products").value = type_detail;
                    document.getElementById("show_products_repo").value = type_detail;
                    document.getElementById("showProductAPI").innerHTML = listProduct;

                    if (data.length < 20) {
                        $(".load-more").css('visibility', 'hidden');
                    } else if (data.length == 20) {
                        $(".load-more").css('visibility', '');
                    }
                })
            );
        } else if (type != null) {
            fetch("https://taimlup.com:8443/vintage/products_type/desc/" + type +"?page=0&size=20&size_choose="+ size_type).then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
    
            document.getElementById("show_products").value = type;
            document.getElementById("show_products_repo").value = type;
        }
    } else if (price_type == 'asc') {
        if (type == 'all') {
            fetch("https://taimlup.com:8443/vintage/products/asc?page=0&size=20&size_choose="+ size_type).then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
    
            document.getElementById("show_products").value = 'all';
            document.getElementById("show_products_repo").value  = 'all';
        } else if (type_detail != null) {
            fetch("https://taimlup.com:8443/vintage/products_type_detail/asc/" + type_detail +"?page=0&size=20&size_choose="+ size_type).then(
                (response) => response.json().then((data) => {
                    var listProduct = "";
                    var array_product = [];
    
                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] != null) {
                            var sold = "";
                            if (data[i].wait_buy == 0) {
                                sold = "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>";
                            } else {
                                sold = "<span class='bage' style='z-index: 2;'>HẾT HÀNG</span><div style='opacity: 0.4;'>" + "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" + "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/></div>";
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
                                                            "<div class='product-content'>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>";
                        }
                    }
                    
                    document.getElementById("show_products").value = type_detail;
                    document.getElementById("show_products_repo").value = type_detail;
                    document.getElementById("showProductAPI").innerHTML = listProduct;

                    if (data.length < 20) {
                        $(".load-more").css('visibility', 'hidden');
                    } else if (data.length == 20) {
                        $(".load-more").css('visibility', '');
                    }
                })
            );
        } else if (type != null) {
            fetch("https://taimlup.com:8443/vintage/products_type/asc/" + type +"?page=0&size=20&size_choose="+ size_type).then(
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
                                                            "<p style='margin-top: 9px; font-weight: 600; font-size: 17px; color: #333'>" + data[i].price + "₫</p>" +
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
    
            document.getElementById("show_products").value = type;
            document.getElementById("show_products_repo").value = type;
        }
    } else {

    }
}

function changeListProductBySize() {
    
}





