window.addEventListener('load', (event) =>{
    var type = window.location.search.split('type=')[1];
    var type_detail = window.location.search.split('type_detail=')[1];

    if (type == null && type_detail == null) {
        fetch("http://103.173.154.17:8080/vintage/products").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            //"<span class='bage' style='z-index: 1;'>Sale</span>" +
                                                            "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>" +
                                                            "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                            "<button type='button' title='Thêm vào giỏ' style='width: 100%;'>" +
                                                            "<span class='btnico'>" +
                                                                "<svg style='width: 16px; padding-top: 3px;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 321.2 321.2' style='enable-background:new 0 0 321.2 321.2;' xml:space='preserve'> <g> <g> <path d='M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z'></path> </g> </g> </svg>" +
                                                            "</span><span>&nbsp; Mua Ngay</span>" +
                                                        "</button>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                $(".load-more-col").slice(0, 15).show();
            })
        );

        document.getElementById("show_products").value = 'all';
    } else if (type != null) {
        fetch("http://103.173.154.17:8080/vintage/products_type/" + type).then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            //"<span class='bage' style='z-index: 1;'>Sale</span>" +
                                                            "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>" +
                                                            "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                            "<button type='button' title='Thêm vào giỏ' style='width: 100%;'>" +
                                                            "<span class='btnico'>" +
                                                                "<svg style='width: 16px; padding-top: 3px;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 321.2 321.2' style='enable-background:new 0 0 321.2 321.2;' xml:space='preserve'> <g> <g> <path d='M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z'></path> </g> </g> </svg>" +
                                                            "</span><span>&nbsp; Mua Ngay</span>" +
                                                        "</button>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                $(".load-more-col").slice(0, 15).show();
            })
        );

        document.getElementById("show_products").value = type;
    } else if (type_detail != null) {
        fetch("http://103.173.154.17:8080/vintage/products_type_detail/" + type_detail).then(
            (response) => response.json().then((data) => {
                var listProduct = "";
                var array_product = [];

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            //"<span class='bage' style='z-index: 1;'>Sale</span>" +
                                                            "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>" +
                                                            "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                            "<button type='button' title='Thêm vào giỏ' style='width: 100%;'>" +
                                                            "<span class='btnico'>" +
                                                                "<svg style='width: 16px; padding-top: 3px;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 321.2 321.2' style='enable-background:new 0 0 321.2 321.2;' xml:space='preserve'> <g> <g> <path d='M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z'></path> </g> </g> </svg>" +
                                                            "</span><span>&nbsp; Mua Ngay</span>" +
                                                        "</button>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                        document.getElementById("show_products").value = data[i].type;
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                $(".load-more-col").slice(0, 15).show();
            })
        );
    }
});

function changeListProduct(valType) {
    var type = "";

    if (valType == 1) {
        type = document.getElementById("show_products").value;
    } else if (valType ==2) {
        type = document.getElementById("show_products_repo").value;
    }
    if (type == 'all') {
        fetch("http://103.173.154.17:8080/vintage/products").then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            //"<span class='bage' style='z-index: 1;'>Sale</span>" +
                                                            "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>" +
                                                            "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                            "<button type='button' title='Thêm vào giỏ' style='width: 100%;'>" +
                                                            "<span class='btnico'>" +
                                                                "<svg style='width: 16px; padding-top: 3px;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 321.2 321.2' style='enable-background:new 0 0 321.2 321.2;' xml:space='preserve'> <g> <g> <path d='M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z'></path> </g> </g> </svg>" +
                                                            "</span><span>&nbsp; Mua Ngay</span>" +
                                                        "</button>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                $(".load-more-col").slice(0, 15).show();
            })
        );

        document.getElementById("show_products").value = 'all';
        document.getElementById("show_products_repo").value = 'all';
    } else if (type != "") {
        fetch("http://103.173.154.17:8080/vintage/products_type/" + type).then(
            (response) => response.json().then((data) => {
                var listProduct = "";

                for (var i = 0; i <= data.length; i++) {
                    if (data[i] != null) {
                        listProduct += "<div class='load-more-col responsive-list'>" +
                                            "<div class='product-item' style='padding: 2%'>" +
                                                    "<a href='product?id=" + data[i].id + "' >" +
                                                        "<div class='product-thumb hover-switch'>" +
                                                            //"<span class='bage' style='z-index: 1;'>Sale</span>" +
                                                            "<img class='img-responsive' src='" + data[i].images[1].path + "' alt='product-img' href='product'/>" +
                                                            "<img class='img-responsive' src='" + data[i].images[0].path + "' alt='product-img' href='product'/>" +
                                                        "</div>" +
                                                    "</a>" +
                                                    "<div style='width: 97%; margin: auto; margin-top: 102%;'>" +
                                                        "<a href='product?id=" + data[i].id + "' class='product-name__custom' >" + data[i].name + "</a><br>" +
                                                        "<span style='font-weight: 400; font-size: 11px; color: #666;'>Kích thước/Size: " + data[i].size + "</span><br>" +
                                                        "<p style='margin-top: 16px; font-weight: 600; font-size: 14px; color: #333'>" + data[i].price + "₫</p>" +
                                                        "<div class='product-content'>" +
                                                            "<button type='button' title='Thêm vào giỏ' style='width: 100%;'>" +
                                                            "<span class='btnico'>" +
                                                                "<svg style='width: 16px; padding-top: 3px;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 321.2 321.2' style='enable-background:new 0 0 321.2 321.2;' xml:space='preserve'> <g> <g> <path d='M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z'></path> </g> </g> </svg>" +
                                                            "</span><span>&nbsp; Mua Ngay</span>" +
                                                        "</button>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>";
                    }
                }
                document.getElementById("showProductAPI").innerHTML = listProduct;

                $(".load-more-col").slice(0, 15).show();
            })
        );
        document.getElementById("show_products").value = type;
        document.getElementById("show_products_repo").value = type;
    }
}

