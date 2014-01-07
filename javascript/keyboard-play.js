/*
 * The goal of this is to make all the keyboard notes play.
 */

var whiteScale = [0, 2, 4, 5, 7, 9, 11, 12];
var blackScale = [1, 3, 6, 8, 10];

var keyBoard = document.getElementById('keyBoard');
var whiteKey = keyBoard.getElementsByTagName('a');

var keyboardNavigation = function() {
    console.log(whiteKey);

    addActive = function() {
        whiteKey.className += "active";
    }

};

keyBoard.style.display = "none";

//whiteKey.onmousedown = keyboardNavigation();

var javascriptWork = function() {
    var theHtmlNode = document.childNodes[1];
    var theParagraphNode = document.getElementById('keyBoard');
    var allParagraphs = document.getElementsByTagName('p')
    if (!theHtmlNode) {
        alert( "theHtmlNode is a " + theHtmlNode.nodeName + " node!" );
    }

    getwidth = function() {
        return allParagraphs[1].clientWidth;
        alert("theParagraphNode is a " + theParagraphNode + " node." );
    }
    return true;

};