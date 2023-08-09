$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    fetch("https://taimlup.com:8443/vintage/discount/" + id).then(
        (response) => response.json().then((data) => {
            if (data != null) {
                //let start_date_json = JSON.stringify(data.start_date);
                let start_date = new Date(data.start_date);
                start_date.setMinutes(start_date.getMinutes() - start_date.getTimezoneOffset());
                document.getElementById('start_date').value = start_date.toISOString().slice(0, -1);

                //let end_date_json = JSON.stringify(data.end_date);
                let end_date = new Date(data.end_date);
                end_date.setMinutes(end_date.getMinutes() - end_date.getTimezoneOffset());
                document.getElementById('end_date').value = end_date.toISOString().slice(0, -1);

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
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var product = new FormData();

    product.append('start_date', new Date(document.getElementById("start_date").value));
    product.append('end_date', new Date(document.getElementById("end_date").value));
    product.append('code', document.getElementById("code").value);
    product.append('type', document.getElementById("type").value);
    product.append('discount_price', document.getElementById("discount_price").value);
    product.append('discount_percent', document.getElementById("discount_percent").value);

    fetch('https://taimlup.com:8443/vintage/discount/update/' + id, {
        method: 'POST',
        body: product // This is your file object
        }).then(response => {
            alert('Cập nhập sản phẩm thành công!');
            window.location.href="discount";
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
