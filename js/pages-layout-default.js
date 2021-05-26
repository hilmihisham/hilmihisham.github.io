// This will wait for the DOM (your HTML) to be loaded before executing
$(document).ready(function() {
    footerCopyrightYear();
});

function footerCopyrightYear() {
    var currentYear = new Date().getFullYear();
    console.log("footerCopyrightYear = " + currentYear);
    document.getElementById("footerCopyrightYear").innerHTML = currentYear;
}