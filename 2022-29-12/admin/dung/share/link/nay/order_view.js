$(document).ready(function() {
	var id = window.location.search.split('id=')[1];
    fetch("http://103.173.154.17:8080/vintage/order/" + id).then(
        (response) => response.json().then((data) => {
            if (data != null) {
                let date = JSON.stringify(data.date)
                date = date.slice(1,11)

                document.getElementById("date").value = date;
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