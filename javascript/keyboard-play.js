/*
 * The goal of this is to make all the keyboard notes play.
 */

var Navigation = function() {
    var base = this;

    base.keyboard = document.getElementById('keyboard');
    base.whiteKey = base.keyboard.getElementsByTagName('li');

    base.addActive = function(e) {
        var pressedKey = e.target;
        pressedKey.className += " active";
        pressedKey.addEventListener('mouseout', base.removeActive);
    };

    base.removeActive = function(e) {
        var target = e.target,
            parent = e.target.offsetParent;

        base.replaceClassName(target);

        if (parent.tagName === "LI") {
            base.replaceClassName(parent);
        }
    };


    base.replaceClassName = function(input) {
        input.className = input.className.replace(/(?:^|\s)active(?!\S)/g , '' );
        return base;
    };

    base.keepActive = function(e) {
        var parent = e.target.offsetParent;
        if (parent.tagName === "LI") {
            parent.className += " active";
            e.target.addEventListener('mouseout', base.removeActive)
        }
    };

    base.findKeys = function() {
        var i = 0;
        for (; i < base.whiteKey.length; i++) {
            var whiteKey = base.whiteKey[i];

            whiteKey.addEventListener('mouseover', base.addActive, true);
            if (whiteKey.getElementsByTagName('a').length > 0) {
                whiteKey.getElementsByTagName('a')[0].addEventListener('mouseover', base.keepActive, true);
            }
        }
    };

    base.getWhiteScale = function() {
        return [0, 2, 4, 5, 7, 9, 11, 12];
    };

    base.getBlackScale = function() {
        return [1, 3, 6, 8, 10];
    }
}

var navigation = new Navigation();
window.addEventListener("load", navigation.findKeys, true);




