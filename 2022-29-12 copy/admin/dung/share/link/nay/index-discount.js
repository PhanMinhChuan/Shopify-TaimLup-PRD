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

            var listProduct = "<tr><th>STT</th><th>Ngày bắt đầu</th><th>Ngày kết thúc</th><th>Thao tác</th></tr>";

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