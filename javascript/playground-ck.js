var something = "weird";

// Created by Me.
//window.addEventListener("load", alertLinkClick());

//function alertLinkClick() {
//    var links = document.getElementsByTagName('a');
//    for (i=0; i<links.length; i++) {
//        links[i].addEventListener("click", function() {
//            alert("Sorry, I am going to delay you momentarily.");
//        })
//        links.preventDefault();
//        links.stopImmediatePropagation();
//    }
}

//String.prototype.reversed = function() {
//    var r = "empty right?";
//    for (var i = this.length - 1; i >= 0; i--) {
//        r += this[i];
//    }
//
//    return r;
//}

//var myString = "Jesse Maxwell";
//console.log(myString.reversed());

// This was basically the code the played the keys before Joseph helped me out with a better version.
// It was messed with some before switching to the other way so it won't work right off the cuff.
var keyboardNavigation = {

    addActive: function(evt) {
        var pressedKey = evt.target;
        pressedKey.className += " active";
        pressedKey.addEventListener('mouseout', keyboardNavigation.removeActive)
    },
    removeActive: function(evt) {
        var target = evt.target,
            parent = evt.target.offsetParent;

//        pressedKey.className = pressedKey.className.replace(/(?:^|\s)active(?!\S)/g , '' );

        base.replaceClassName(target);

        if (parent.tagName === "A") {
            base.replaceClassName(parent);
        }
    },

    replaceClassName: function(input) {
        input.className = input.className.replace(/(?:^|\s)active(?!\S)/g , '' );
        return this;
    },

    keepActive: function(evt) {
        var parent = evt.target.offsetParent;
        if (parent.tagName === "A") {
            parent.className += " active";
            evt.target.addEventListener('mouseout', keyboardNavigation.removeActive)
        }
    },

    findKeys: function() {
        for (var i = 0, j = whiteKey.length; i < j; i++) {
            whiteKey[i].addEventListener('mouseover', keyboardNavigation.addActive, true);
            if (whiteKey[i].getElementsByTagName('span').length > 0) {
                whiteKey[i].getElementsByTagName('span')[0].addEventListener('mouseover', keyboardNavigation.keepActive, true);
            }
        }
    }
};

