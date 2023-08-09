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

    fetch("https://taimlup.com:8443/vintage/products/trash").then(
        (response) => response.json().then((data) => {

            var listProduct = "<tr><th>STT</th><th>Tên</th><th>Hình ảnh</th><th>Thao tác</th></tr>";

            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null && data[i].images[0] != null) {
                    listProduct += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + data[i].name + "</td>" +
                                    "<td><img class='media-object' src='" + data[i].images[0].path + "' alt='image' style='height: 120px; width: 120px;'/></td>" +
                                    "<td>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='myFunction(\""+ data[i].id + "\")'>DELETE</a><br><br>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='trashBack(\""+ data[i].id + "\")'>BACK</a>" +
                                    "</td>" +
                                    "</tr>";
                }
            }
            document.getElementById("listproducttrash").innerHTML = listProduct;
        })
    );
});

function myFunction(id) {
    let text = "Bạn có chắc chắn muốn xóa?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/product/delete/' + id, {
            method: 'DELETE',
            })
            .then(response => {window.location.href="product_trash";});
    }
}

function trashBack(id) {
    let text = "Bạn có chắc chắn sản phẩm sẽ được bày bán lại?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/product/trash/' + id, {
            method: 'PUT',
            })
            .then(response => {window.location.href="product_trash";});
    }
}