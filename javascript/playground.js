// Created by Me.
window.addEventListener("load", alertLinkClick());

function alertLinkClick() {
    var links = document.getElementsByTagName('a');
    for (i=0; i<links.length; i++) {
        links[i].addEventListener("click", function() {
            alert("Sorry, I am going to delay you momentarily.");
            links.preventDefault();
        })
    }
}

