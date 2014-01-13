/*
 * The goal of this is to make all the keyboard notes play.
 */

var Navigation = function() {
    var base = this;

    base.keyboard = document.getElementById('keyboard');
//    base.whiteKey = base.keyboard.getElementsByTagName('li');
    base.pianoKey = base.keyboard.getElementsByTagName('li');
    base.totalKeys = base.pianoKey.length;
    base.docHeight = document.childNodes[1].scrollHeight - document.childNodes[1].clientHeight;
    base.rangeOfKey = base.docHeight / base.totalKeys - 1;

    // This adds the "active" class to the keys when they are hovered.
    base.addActive = function(e) {
        var pressedKey = e.target;
        pressedKey.className += " active";
        pressedKey.addEventListener('mouseout', base.removeActive);
    };

    // Removes the "active" class from the <li /> even if an <a /> triggers mouse-out.
    base.removeActive = function(e) {
        var target = e.target,
            parent = e.target.offsetParent;

        base.replaceClassName(target);

        if (parent.tagName === "LI") {
            base.replaceClassName(parent);
        }
    };

    // Finds and replaces the "active" class.
    base.replaceClassName = function(input) {
        if (input !== undefined) {
            input.className = input.className.replace(/(?:^|\s)active(?!\S)/g , '' );
            return base;
        }
    };

    // If the parent is a <li /> then keep the active on.
    base.keepActive = function(e) {
        var parent = e.target.offsetParent;
        if (parent.tagName === "LI") {
            parent.className += " active";
            e.target.addEventListener('mouseout', base.removeActive);
        }
    };

    // Finds all the piano keys and allows them to be hovered. It also allows for the addition of an <a />
    // and prevents it from flashing "active".
    base.findKeys = function() {
        var i = 0;
        for (; i < base.pianoKey.length; i++) {
            var whiteKey = base.pianoKey[i];

            whiteKey.addEventListener('mouseover', base.addActive, true);
            if (whiteKey.getElementsByTagName('a').length > 0) {
                whiteKey.getElementsByTagName('a')[0].addEventListener('mouseover', base.keepActive, true);
            }
        }
    };

    // This rounds the scrollY number so that it can be used to access values in the pianoKey array.
    // It will then add the "active" class to that specific key.
    // It saves the current key to the lastKey variable so it knows what was the last "active" tag.
    base.pressKeys = function() {
        if (base.lastKey !== undefined) {
            base.replaceClassName(base.pianoKey[base.lastKey]);
        }

        var keyCode = Math.round((window.scrollY/base.docHeight) * base.totalKeys),
            key = base.pianoKey[keyCode];

        if (key !== undefined) {
            key.className += " active";
        }

        base.lastKey = keyCode;
    };

    // This loads the functions.
    base.load = function() {
        base.lastKey = 0;

        base.findKeys();
        base.pressKeys();

        window.addEventListener("scroll", base.pressKeys, true);
    };
};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);



