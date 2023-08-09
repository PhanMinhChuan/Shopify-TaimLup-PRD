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

    fetch("https://taimlup.com:8443/vintage/discounts").then(
        (response) => response.json().then((data) => {

            var listProduct = "<tr><th>STT</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>Code</th><th>Thể loại</th><th>Thao tác</th></tr>";
            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null) {

                    listProduct += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + moment(new Date(data[i].start_date)).format("YYYY-MM-DD HH:mm:ss A") + "</td>" +
                                    "<td>" + moment(new Date(data[i].end_date)).format("YYYY-MM-DD HH:mm:ss A") + "</td>" +
                                    "<td>" + data[i].code + "</td>" +
                                    "<td>" + data[i].type + "</td>" +
                                    "<td>" +
                                        "<a href='discount_update?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>UPDATE</a><br><br>" +
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

    fetch('https://taimlup.com:8443/vintage/discount/create', {
        method: 'POST',
        headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
            //"Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
        },
        body: product // This is your file object
    }).then(response => {
        alert('Thêm mã giảm giá thành công!');
        window.location.href="discount";
    });
}

function deleteDiscount(id) {
    let text = "Bạn có chắc chắn muốn xóa?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/discount/delete/' + id, {
            method: 'DELETE',
            })
        .then(response => {window.location.href="discount";});
    }
}
