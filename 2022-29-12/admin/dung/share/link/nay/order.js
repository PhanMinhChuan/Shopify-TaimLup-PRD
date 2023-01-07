$(document).ready(function() {
	$('.nav-btn').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.sidebar').slideToggle('fast');

		window.onresize = function(){
			if ($(window).width() >= 768) {
				$('.sidebar').show();
			} else {
				$('.sidebar').hide();
			}
		};
	});

    fetch("http://103.173.154.17:8080/vintage/orders").then(
        (response) => response.json().then((data) => {

            var listOrder = "<tr><th>STT</th><th>Ngày mua</th><th>PHONE</th><th>DON HANG</th><th>Giá cuối cùng</th><th>Cách trả tiền</th><th>Xem chi tiết</th></tr>";
            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null) {
                    let date = JSON.stringify(data[i].date);
                    date = date.slice(1,11);

                    listImage = "";
                    if (data[i].products != null) {
                        for (var j = 0; j <= data[i].products.length; j++) {
                            if (data[i].products[j] != null) {
                                listImage += "<img class='media-object' src='" + data[i].products[j].image + "' alt='image' style='height: 120px; width: 120px;'/>"
                            }
                        }
                    }

                    listOrder += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + date + "</td>" +
                                    "<td>" + data[i].phone + "</td>" +
                                    "<td>" + listImage + "</td>" +
                                    "<td>" + data[i].price_discount + "</td>" +
                                    "<td>" + data[i].type + "</td>" +
                                    "<td>" +
                                        "<a href='order_view.html?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>XEM</a><br><br>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='deleteOrder(\""+ data[i].id + "\")'>XÓA</a>" +
                                    "</td>" +
                                 "</tr>";
                }
            }
            document.getElementById("listOrder").innerHTML = listOrder;
        })
    );
});

function deleteOrder(id) {
    let text = "Bạn có chắc chắn muốn xóa?";
    if (confirm(text) == true) {
        fetch('http://103.173.154.17:8080/vintage/order/delete/' + id, {
            method: 'DELETE',
            })
        .then(response => {window.location.href="order.html";});
    }
}
