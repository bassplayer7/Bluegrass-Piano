/*
 * The goal of this is to make all the keyboard notes play.
 */

var Navigation = function() {
    var base = this;

    base.keyboard = document.getElementById('keyboard');
    base.whiteKey = base.keyboard.getElementsByTagName('li');
    base.totalKeys = base.whiteKey.length;
    base.docHeight = document.childNodes[1].scrollHeight - document.childNodes[1].clientHeight;
    base.rangeOfKey = base.docHeight / base.totalKeys - 1;
    base.activeElements = 0;

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
        input.className = input.className.replace(/(?:^|\s)active(?!\S)/g , '' );
        return base;
    };

    // If the parent is a <li /> then keep the active on.
    base.keepActive = function(e) {
        var parent = e.target.offsetParent;
        if (parent.tagName === "LI") {
            parent.className += " active";
            e.target.addEventListener('mouseout', base.removeActive);
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

    base.currentKey = function() {
        var arr = [];
        var i = 0;
        for (; i < base.whiteKey.length; i++) {
            arr.push(base.rangeOfKey * i);
        }
        return arr;
    };

    base.removeActiveScroll = function(pos) {
        base.replaceClassName(base.whiteKey[pos]);
    };

    base.pressKeys = function() {
        var currentScroll = window.scrollY;

        var i = 0;
        for (; i < base.position.length; i++) {
            if (currentScroll >= base.position[i] && currentScroll <= (base.position[i] + base.rangeOfKey)) {
                base.whiteKey[i].className += " active";
                base.activeElements = i;
            } else {
                base.removeActiveScroll(i);
            }
        }
    };

    base.load = function() {
        base.findKeys();
        base.currentKey();
        base.pressKeys()
        base.position = base.currentKey();

        window.addEventListener("scroll", navigation.pressKeys, true);
    }
};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);



