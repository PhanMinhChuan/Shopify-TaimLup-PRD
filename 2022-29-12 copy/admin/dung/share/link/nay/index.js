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

    fetch("https://taimlup.com:8443/vintage/products").then(
        (response) => response.json().then((data) => {

            var listProduct = "<tr><th>STT</th><th>Tên</th><th>Hình ảnh</th><th>Thao tác</th></tr>";

            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null && data[i].images[0] != null) {
                    listProduct += "<tr>" +
                                    "<td>" + (i+1) +"</td>" +
                                    "<td>" + data[i].name + "</td>" +
                                    "<td><img class='media-object' src='" + data[i].images[0].path + "' alt='image' style='height: 120px; width: 120px;'/></td>" +
                                    "<td>" +
                                        "<a href='update?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>UPDATE</a><br><br>" +
                                        "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='myFunction(\""+ data[i].id + "\")'>DELETE</a>" +
                                    "</td>" +
                                    "</tr>";
                }
            }
            document.getElementById("listAPI").innerHTML = listProduct;

            $(".load-more-col").slice(0, 15).show();
        })
    );
});


var product = new FormData();

function addImage() {
    const fileInput = document.querySelector('#chuan') ;
    for (const file of fileInput.files) {
        //product.append('image', fileInput.files[0]);
        product.append('image', file);
    }
}

function addProduct(e) {
    product.append('type', document.getElementById("type").value);
    product.append('name', document.getElementById("name").value);
    product.append('size', document.getElementById("size").value);
    product.append('size_model', document.getElementById("size_model").value);
    product.append('size_length', document.getElementById("size_length").value);
    product.append('size_waist', document.getElementById("size_waist").value);
    product.append('size_leg', document.getElementById("size_leg").value);
    product.append('condition_percent', document.getElementById("condition_percent").value);
    product.append('trademark', document.getElementById("trademark").value);
    product.append('price', document.getElementById("price").value);

    fetch('https://taimlup.com:8443/vintage/product/upload', {
        method: 'POST',
        headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
            //"Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
        },
        body: product // This is your file object
        }).then(response => {
            alert('Thêm sản phẩm thành công!');
            window.location.href="index";
    });
}

function myFunction(id) {
    let text = "Bạn có chắc chắn muốn xóa?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/product/delete/' + id, {
            method: 'DELETE',
            })
            .then(response => {window.location.href="index";});
    }
}