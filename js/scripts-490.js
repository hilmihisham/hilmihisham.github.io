var slideIndex = 1;
showDivs(slideIndex);

// down arrow on the header picture
function scrollDown() {
    console.log('scrolling...');
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });
}

// screenshots gallery scrolling
function plusDivs(n) {
  showDivs(slideIndex += n);
}

// screenshots gallery show picture
function showDivs(n) {
    var x = document.getElementsByClassName("screenshots");
    // console.log('x.length = ' + x.length);
    
    if (n > x.length) { 
        slideIndex = 1 
    }

    if (n < 1) { 
        slideIndex = x.length 
    }
    
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    
    x[slideIndex-1].style.display = "block";  
}