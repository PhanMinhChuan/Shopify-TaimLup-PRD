function nextMenu() {
    if($("#menu__hide")[0].checked == false) {
        document.getElementById("logo-menu").innerHTML = "<i class='bi bi-x' style='font-size: 30px;'></i>";
    } else {
        document.getElementById("logo-menu").innerHTML = "<i class='bi bi-list' style='font-size: 30px;'></i>";
    }
}

$( "#target" ).click(function() {
    alert( "Handler for .click() called." );
});


function zoom100(id) {
    $('<div class=remove>').css({
        background: 'RGBA(0,0,0,.5) url('+$('img[id='+id+']').attr('src').substr($('img[id='+id+']').attr('src').lastIndexOf("\\") + 1) +') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        $(this).remove();
    }).appendTo('body');
}

function zoomDefault() {
    var urlDefault = '/images/product_default.jpg';
    $('<div class=remove>').css({
        background: 'RGBA(0,0,0,.5) url(' + urlDefault + ') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        $(this).remove();
    }).appendTo('body');
}

function sortCategory() {
    document.getElementById("category_selecte").classList.add("opened");
}

function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    zoom = document.getElementById("zoom-effect");

    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    result.style.display = 'none';
    result.style.position = 'absolute';
    result.style.margin = '-21px';
    result.style.marginLeft = '0px';
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    
    zoom.addEventListener("mousemove", displayBlock);
    zoom.addEventListener("mouseleave", displayNone);
    
    function moveLens(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
    function displayNone() {
        result.style.display = 'none';
    }
    function displayBlock() {
        result.style.display = 'block';
    }
}