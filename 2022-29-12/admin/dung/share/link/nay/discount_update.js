$(document).ready(function() {
	var id = window.location.search.split('id=')[1];
    fetch("http://103.173.154.17:8080/vintage/discount/" + id).then(
        (response) => response.json().then((data) => {
            if (data != null) {
                let start_date = JSON.stringify(data.start_date)
                start_date = start_date.slice(1,11)

                let end_date = JSON.stringify(data.end_date)
                end_date = end_date.slice(1,11)

                document.getElementById("start_date").value = start_date;
                document.getElementById("end_date").value = end_date;
                document.getElementById("code").value = data.code;
                document.getElementById("type").value = data.type;
                document.getElementById("discount_price").value = data.discount_price;
                document.getElementById("discount_percent").value = data.discount_percent;
            }
            enableByType();
        })
    );
});


function addDiscount(e) {
    var id = window.location.search.split('id=')[1];
    var product = new FormData();

    product.append('start_date', new Date(document.getElementById("start_date").value));
    product.append('end_date', new Date(document.getElementById("end_date").value));
    product.append('code', document.getElementById("code").value);
    product.append('type', document.getElementById("type").value);
    product.append('discount_price', document.getElementById("discount_price").value);
    product.append('discount_percent', document.getElementById("discount_percent").value);

    fetch('http://103.173.154.17:8080/vintage/discount/update/' + id, {
        method: 'POST',
        body: product // This is your file object
        }).then(response => {
            alert('Cập nhập sản phẩm thành công!');
            window.location.href="discount.html";
    });
}

function enableByType() {
    var type = document.getElementById("type").value;
    if (type == 'money') {
        document.getElementById("check_discount_price").style.display = '';
        document.getElementById("check_discount_percent").style.display = 'none';
    } else if (type == 'percent') {
        document.getElementById("check_discount_price").style.display = 'none';
        document.getElementById("check_discount_percent").style.display = '';
    } else {
        document.getElementById("check_discount_price").style.display = 'none';
        document.getElementById("check_discount_percent").style.display = 'none';
    }
}
