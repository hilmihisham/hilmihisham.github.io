// to import html file into another html
// ref: https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    
    // loop through a collection of ALL html elements
    z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        elmnt = z[i];

        // search for element with a certain attributes
        file = elmnt.getAttribute("includeHTML");

        if (file) {
            // make an HTTP request using the attribute value as the file name
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found";
                    }

                    // remove the attribute, and call this function once more
                    elmnt.removeAttribute("includeHTML");
                    includeHTML();
                }
            }

            xhttp.open("GET", file, true);
            xhttp.send();

            return;
        }
    }
};