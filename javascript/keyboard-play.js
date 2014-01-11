/*
 * The goal of this is to make all the keyboard notes play.
 */

var Navigation = function() {
    var base = this;

    base.keyboard = document.getElementById('keyboard');
    base.whiteKey = base.keyboard.getElementsByTagName('li');
    base.totalKeys = base.whiteKey.length;
    base.docHeight = document.childNodes[1].offsetHeight;
    base.rangeOfKey = base.docHeight / base.totalKeys;

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

    base.currentKey = function() {
        var arr = new Array();
        var i = 0;
        for (; i < base.whiteKey.length; i++) {
            arr.push(base.rangeOfKey * i);
        }
        return arr;
    };

    base.position = base.currentKey();

    base.removeActiveScroll = function(pos) {
        base.replaceClassName(base.whiteKey[pos]);
    };

    base.pressKeys = function() {
//        var totalKeys = base.whiteKey.length;
//        var docHeight = document.childNodes[1].offsetHeight;
//        var rangeOfKey = docHeight / totalKeys;
        var currentScroll = window.scrollY;
//        var position = base.currentKey();

        var i = 0;
        for (; i < base.position.length; i++) {
            if (currentScroll > base.position[i] && currentScroll < (base.position[i] + base.rangeOfKey)) {
                base.whiteKey[i].className += " active";
                base.activeElements = i;
                console.log(base.activeElements);
                break;
            } else {
//                console.log(position[i] + "position[i]");
                base.removeActiveScroll(i);
            }
        }
    }
}

var navigation = new Navigation();
window.addEventListener("load", navigation.findKeys, true);
window.addEventListener("load", navigation.currentKey, true);
window.addEventListener("scroll", navigation.pressKeys, true);




