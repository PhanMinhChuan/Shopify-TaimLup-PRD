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

    fetch("http://103.173.154.17:8080/vintage/discounts").then(
        (response) => response.json().then((data) => {

            var listProduct = "<tr><th>STT</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>Code</th><th>Thể loại</th><th>Thao tác</th></tr>";
            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null) {
                    let start_date = JSON.stringify(data[i].start_date);
                    start_date = start_date.slice(1,11);
                    let end_date = JSON.stringify(data[i].end_date);
                    end_date = end_date.slice(1,11);

                    listProduct += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + start_date + "</td>" +
                                    "<td>" + end_date + "</td>" +
                                    "<td>" + data[i].code + "</td>" +
                                    "<td>" + data[i].type + "</td>" +
                                    "<td>" +
                                        "<a href='discount_update.html?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>UPDATE</a><br><br>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='deleteDiscount(\""+ data[i].id + "\")'>DELETE</a>" +
                                    "</td>" +
                                    "</tr>";
                }
            }
            document.getElementById("listDiscount").innerHTML = listProduct;
        })
    );
});

function addDiscount() {
    var product = new FormData();

    product.append('start_date', new Date(document.getElementById("start_date").value));
    product.append('end_date', new Date(document.getElementById("end_date").value));
    product.append('code', document.getElementById("code").value);
    product.append('type', document.getElementById("type").value);
    product.append('discount_price', document.getElementById("discount_price").value);
    product.append('discount_percent', document.getElementById("discount_percent").value);

    fetch('http://103.173.154.17:8080/vintage/discount/create', {
        method: 'POST',
        headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
            //"Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
        },
        body: product // This is your file object
    }).then(response => {
        alert('Thêm mã giảm giá thành công!');
        window.location.href="discount.html";
    });
}

function deleteDiscount(id) {
    let text = "Bạn có chắc chắn muốn xóa?";
    if (confirm(text) == true) {
        fetch('http://103.173.154.17:8080/vintage/discount/delete/' + id, {
            method: 'DELETE',
            })
        .then(response => {window.location.href="discount.html";});
    }
}
