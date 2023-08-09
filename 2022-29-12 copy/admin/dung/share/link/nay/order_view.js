$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    fetch("https://taimlup.com:8443/vintage/order/" + id).then(
        (response) => response.json().then((data) => {
            if (data != null) {
                let date = JSON.stringify(data.date)
                date = date.slice(1,11)


                document.getElementById("date").innerHTML = data.date;
                document.getElementById("name").innerHTML = data.name;
                document.getElementById("phone").innerHTML = data.phone;
                document.getElementById("address").innerHTML = data.address;
                document.getElementById("address_detail").innerHTML = data.address_detail;
                document.getElementById("note").innerHTML = data.note;
                document.getElementById("type").innerHTML = data.type;

                var products = "";
                for (var i = 0; i < data.products.length; i++) {
                    products += "<img class='media-object' src='" + data.products[i].image + "' alt='image' style='height: 120px; width: 120px;'/>";
                    products += "<p>Tên: " + data.products[i].name + "<p/>";
                    products += "<p>Giá: " + data.products[i].price + "<p/>";
                }

                document.getElementById("list_product_by_order").innerHTML = products;
                document.getElementById("price").innerHTML = data.price;
                document.getElementById("voucher").innerHTML = data.voucher;
                document.getElementById("price_discount").innerHTML = data.price_discount;
            }
        })
    );
});

function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}