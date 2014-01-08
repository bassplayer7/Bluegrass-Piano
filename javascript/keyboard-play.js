/*
 * The goal of this is to make all the keyboard notes play.
 */

var whiteScale = [0, 2, 4, 5, 7, 9, 11, 12];
var blackScale = [1, 3, 6, 8, 10];

var keyBoard = document.getElementById('keyBoard');
var whiteKey = keyBoard.getElementsByTagName('a');

var keyboardNavigation =  {

    addActive: function(key) {
        if (key.className !== "active") {
            key.className += " active";
        }
    },
    removeActive: function(key) {
        if (key.className === " active") {
            key.className -= " active";
        }
    },
    addEvent: function(obj, type, fn) {
        if ( obj.attachEvent) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn] (window.event); };
            obj.attachEvent('on'+type, obj[type_fn] );
        } else {
            obj.addEventListener( type, fn, false );
        }
    },

    initialize: function() {
        for (var i=0; i<whiteKey.length - 1; i++) {
            var note = whiteKey[i];
            keyboardNavigation.addEvent(note, "mouseover", function(e) {
                var target = window.event ? window.event.srcElement : e.target;
                keyboardNavigation.addActive(target);
            }, true);
            keyboardNavigation.addEvent(note, "mouseout", function(e) {
                var target = window.event ? window.event.srcElement : e.target;
                keyboardNavigation.removeActive(target);
            }, true)
        }
    }
};
keyboardNavigation.addEvent(window, "load", keyboardNavigation.initialize);


//whiteKey.onmousedown = keyboardNavigation();

//var javascriptWork = function() {
//    var theHtmlNode = document.childNodes[1];
//    var theParagraphNode = document.getElementById('keyBoard');
//    var allParagraphs = document.getElementsByTagName('p')
//    if (!theHtmlNode) {
//        alert( "theHtmlNode is a " + theHtmlNode.nodeName + " node!" );
//    }
//
//    getwidth = function() {
//        return allParagraphs[1].clientWidth;
//        alert("theParagraphNode is a " + theParagraphNode + " node." );
//    }
//    return true;
//
//};