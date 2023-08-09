$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    var page = urlParams.get('page');
    if (page == null) {
        page = 0;
    }

    var pagination = "<li><a>«</a></li>";
    for (var i = 0; i <= 15; i++) {
        if (i != page) {
            pagination += "<li><a href='product?page="+ i +"'>"+ (i+1) +"</a></li>";
        } else {
            pagination += "<li style='background-color: #ff4d4d;'><a href='product?page="+ i +"'>"+ (i+1) +"</a></li>";
        }
    }
    pagination += '<li><a>»</a></li>';

    document.getElementById("pagination").innerHTML = pagination;

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

    fetch("https://taimlup.com:8443/vintage/products/wait_buy?page="+page).then(
        (response) => response.json().then((data) => {

            var listProduct = "<tr><th>STT</th><th>Tên</th><th>Hình ảnh</th><th>Thao tác</th></tr>";

            for (var i = 0; i <= data.length; i++) {
                if (data[i] != null) {
                    if (data[i].images[0] != null) {
                        listProduct += "<tr>" +
                            "<td>" + (i+1) +"</td>" +
                            "<td>" + data[i].name + "</td>" +
                            "<td><img class='media-object' src='" + data[i].images[0].path + "' alt='image' style='height: 120px; width: 120px;'/></td>" +
                            "<td>" +
                                "<a href='product_update?id=" + data[i].id + "' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;'>UPDATE</a><br><br>" +
                                "<a href='#' style='color: black; border: 1px solid black; padding: 4px; font-size: 16px; margin-top: 10px;' onclick='sold_out_product(\""+ data[i].id + "\")'>ĐÃ BÁN</a>" +
                            "</td>" +
                            "</tr>";
                    }
                }
            }
            document.getElementById("listAPI").innerHTML = listProduct;
        })
    );
});

document.getElementById("add_product").addEventListener("click", function() {

}, {once : true});

var product = new FormData();

function addImage() {
    product = new FormData();
    const fileInput = document.querySelector('#chuan') ;
    for (const file of fileInput.files) {
        product.append('image', file);
    }
}

function addProduct(e) {
    var count = 0;
    if (document.getElementById("name").value == '') {
        alert("Vui lòng nhập tên cho sản phẩm");
        count++;
    }
    else if (document.getElementById("size").value == '') {
        alert("Vui lòng nhập size cho sản phẩm");
        count++;
    }
    else if (document.getElementById("price").value == '') {
        alert("Vui lòng nhập giá cho sản phẩm");
        count++;
    }
    else if (document.querySelector('#chuan').files.length <= 1 || document.querySelector('#chuan').files.length > 7) {
        alert("Vui lòng nhập 2➡8 hình ảnh cho sản phẩm");
        count++;
    }
    else if (document.getElementById("price").value.indexOf(',') == -1  || !Number.isInteger(parseInt(document.getElementById("price").value.replaceAll(',', '')))) {
        alert("Vui lòng đúng định dạng cho giá sản phẩm");
        count++;
    }
    if (count == 0) {
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
        if ($("#type option:selected").val() == "ao") {
            product.append('type_detail', document.getElementById("type_detail_ao").value);
		} else if ($("#type option:selected").val() == "quan") {
			product.append('type_detail', document.getElementById("type_detail_quan").value);
		} else {
            product.append('type_detail', '');
        }
    
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
            window.location.href="product";
        });
    }
}

function sold_out_product(id) {
    let text = "Sản phẩm đã bán?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/product/soldout/' + id, {
            method: 'DELETE',
            })
            .then(response => {window.location.href="product";});
    }
}

function myFunction(id) {
    let text = "Bạn có chắc muốn xóa sản phẩm này?";
    if (confirm(text) == true) {
        fetch('https://taimlup.com:8443/vintage/product/delete/' + id, {
            method: 'DELETE',
            })
            .then(response => {window.location.href="product";});
    }
}

function disableSearch() {
    document.getElementById("menu_1").style.display = 'block';
    document.getElementById("search_repo").value = '';
  
    const searchWrapper = document.querySelector( ".search-input-repo" );
    const suggBox = searchWrapper.querySelector(".autocom-box-repo" );
  
    let listData = '';
    suggBox.innerHTML= listData;
  }


  $('#search_repo').on('input', function(){
    clearTimeout(this.delay);
    this.delay = setTimeout(function(){
  
    /* call ajax request here */
  
  
    // getting all required elements
    const searchWrapper = document.querySelector( ".search-input-repo" );
    const inputBox = searchWrapper.querySelector( "input" );
    const suggBox = searchWrapper.querySelector(".autocom-box-repo" );
    const icon = searchWrapper.querySelector(".icon");
    let linkTag = searchWrapper.querySelector( "a" );
    let webLink;
  
    var names = [];
    var ids = [];
    var imgs = [];
  
    if (this.value != '') {
      fetch("https://taimlup.com:8443/vintage/product/search/"+this.value).then(
        (response) => response.json().then((data) => {
          
    
          for (var i = 0; i <= data.length; i++) {
            if (data[i] != null) {
              names.push(data[i].name);
              ids.push(data[i].id);
              imgs.push(data[i].images[0].path);
  
              // if user press any key and release
              inputBox.onkeyup = (e) => {
                let userData = e.target.value; //user enetered data
                let emptyArray = [];       
  
                emptyArray = names.filter((data) => {
          
                  // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
                  return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
                });
  
                var index = 0;
                emptyArray = emptyArray.map((data) => {
                   //passing return data inside li tag
                   data = "<a href='product?id="+ ids[index] +"'><li style='border-top: 1px solid #b4aaaa; text-overflow: ellipsis; display: inline-block; width: 100%; white-space: nowrap; overflow: hidden !important;'><img style='height: 50px; padding-right: 15px;' src='"+ imgs[index] +"' alt='product-img' href='product'/>"+ data +"</li></a>";
                   index++;
                   return data;
                });
                //for (var j = 0; j < emptyArray.length; j++) {
                //  return data = "<li style='border-top: 1px solid #b4aaaa;'>" + emptyArray[j] + "</li>";
                //}
          
                searchWrapper.classList.add("active"); //show autocomplete box
          
                showSuggestions(emptyArray);
              }
            }
          }
        })
      );
    } else {
      // if user press any key and release
      inputBox.onkeyup = (e) => {
        let userData = e.target.value; //user enetered data
        let emptyArray = [];       
  
        emptyArray = names.filter((data) => {
  
          // Filtering array value and user characters to lowercase and return on ly those words which are start with user enetered chars
          return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
        });
  
        emptyArray = emptyArray.map((data) => {
          // passing return data inside li tag
          return data = "";
        });
  
        searchWrapper.classList.add("active"); //show autocomplete box
  
        showSuggestionsRemove(emptyArray);
  
        let allList = "";
  
        for (let i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute( "onclick", "select(this) ");
        }
      }
    }
  
      function showSuggestions ( list ) {
          let listData;
          if(!list.length ){
              userValue = inputBox.value;
              listData = '<li>'+ userValue +'</li>';
          }else{
              listData = list.join('');
          }
          suggBox.innerHTML= listData;
      }
  
    function showSuggestionsRemove ( list ) {
          let listData = '';
          suggBox.innerHTML= listData;
      }
  
    }.bind(this), 1);
  });
