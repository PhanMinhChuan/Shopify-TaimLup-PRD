$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    fetch("https://taimlup.com:8443/vintage/product/" + id).then(
        (response) => response.json().then((data) => {
            if (data != null) {
                document.getElementById("type").value = data.type;
                document.getElementById("name").value = data.name;
                document.getElementById("size").value = data.size;
                document.getElementById("size_model").value = data.size_model;
                document.getElementById("size_length").value = data.size_length;
                document.getElementById("size_waist").value = data.size_waist;
                document.getElementById("size_leg").value = data.size_leg;
                document.getElementById("condition_percent").value = data.condition_percent;
                document.getElementById("trademark").value = data.trademark;
                document.getElementById("price").value = data.price;
                document.getElementById("reduced_price").value = data.reduced_price;
                if (data.type == "ao") {
                    document.getElementById("check_type_detail_ao").style.display = 'block';
                    document.getElementById("check_type_detail_quan").style.display = 'none';
                    document.getElementById("check_size_leg").style.display = 'none';

                    document.getElementById("type_detail_ao").value = data.type_detail;
                } else if (data.type == "quan") {
                    document.getElementById("check_type_detail_ao").style.display = 'none';
                    document.getElementById("check_type_detail_quan").style.display = 'block';
                    document.getElementById("check_size_leg").style.display = 'block';

                    document.getElementById("type_detail_quan").value = data.type_detail;
                } else {
                    document.getElementById("check_type_detail_ao").style.display = 'none';
                    document.getElementById("check_type_detail_quan").style.display = 'none';
                    document.getElementById("check_size_leg").style.display = 'none';
                }
            }
        })
    );

    
});

var product = new FormData();

function addImage() {
    const fileInput = document.querySelector('#chuan');
    for (const file of fileInput.files) {
        product.append('image', file);
    }
}

function addProduct(e) {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

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
    product.append('reduced_price', document.getElementById("reduced_price").value);
    if ($("#type option:selected").val() == "ao") {
        product.append('type_detail', document.getElementById("type_detail_ao").value);
    } else if ($("#type option:selected").val() == "quan") {
        product.append('type_detail', document.getElementById("type_detail_quan").value);
    } else {
        product.append('type_detail', '');
    }

    fetch('https://taimlup.com:8443/vintage/product/update/' + id, {
        method: 'POST',
        body: product // This is your file object
        }).then(response => {
            alert('Cập nhập sản phẩm thành công!');
            window.location.href="product";
    });
}
