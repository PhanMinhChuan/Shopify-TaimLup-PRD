$(document).ready(function() {
	var id = window.location.search.split('id=')[1];
    fetch("http://103.173.154.17:8080/vintage/product/" + id).then(
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
            }
        })
    );
});

var product = new FormData();

function addImage() {
    const fileInput = document.querySelector('#chuan') ;
    for (const file of fileInput.files) {
        product.append('image', file);
    }
}

function addProduct(e) {
    var id = window.location.search.split('id=')[1];

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

    fetch('http://103.173.154.17:8080/vintage/product/update/' + id, {
        method: 'POST',
        body: product // This is your file object
        }).then(response => {
            alert('Cập nhập sản phẩm thành công!');
            window.location.href="product.html";
    });
}
