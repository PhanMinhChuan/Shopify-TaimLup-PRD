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

    fetch("https://taimlup.com:8443/vintage/orders").then(
        (response) => response.json().then((data) => {

            var listOrder = "<tr><th>STT</th><th>Ngày mua</th><th>PHONE</th><th>DON HANG</th><th>Giá cuối cùng</th><th>Cách trả tiền</th><th>TRẠNG THÁI SHIP</th><th>Xem chi tiết</th></tr>";
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
                    var ship_str = "";
                    if (data[i].status_ship == 0) {
                        ship_str = "<p style='color: red;'>CHƯA SHIP ĐƠN</p>";
                    } else if (data[i].status_ship == 1) {
                        ship_str = "<p style='color: green;'>ĐÃ SHIP</p>";
                    }

                    listOrder += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + data[i].date + "</td>" +
                                    "<td>" + data[i].phone + "</td>" +
                                    "<td>" + listImage + "</td>" +
                                    "<td>" + data[i].price_discount + "</td>" +
                                    "<td>" + data[i].type + "</td>" +
                                    "<td>" + ship_str + "</td>" +
                                    "<td>" +
                                        "<a href='order_view?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>XEM</a><br><br>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='deleteOrder(\""+ data[i].id + "\")'>SHIP ĐƠN</a>" +
                                    "</td>" +
                                 "</tr>";
                }
            }
            document.getElementById("listOrder").innerHTML = listOrder;
        })
    );
});

function deleteOrder(id) {
    let text = "Bạn đã ship đơn này chưa?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/order/delete/' + id, {
            method: 'DELETE',
            })
        .then(response => {window.location.href="order";});
    }
}

function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}
