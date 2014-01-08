/**
 * Created by jessemaxwell on 1/7/14.
 */
var square = document.getElementById('square'),
    clickMe = document.getElementById('clickMe');

function doDemo () {

    var button = this;
    square.style.backgroundColor = "red";
//    button.setAttribute('disabled', true);
//    setTimeout(clearDemo, 2000, button);

    if (square.style.backgroundColor === "red") {
        square.style.backgroundColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    }
}

function clearDemo (button) {
    var square = document.getElementById('square');
    square.style.backgroundColor = "transparent";
//    button.removeAttribute("disabled");
}

clickMe.onclick = doDemo;