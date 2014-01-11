/*
 * The goal of this is to make all the keyboard notes play.
 */

var Navigation = function() {
    var base = this;

    base.keyboard = document.getElementById('keyboard');
    base.whiteKey = base.keyboard.getElementsByTagName('li');
    base.activeElements = new Array();

    base.addActive = function(e) {
//        console.log(e);
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
        var totalKeys = base.whiteKey.length;
        var docHeight = document.childNodes[1].offsetHeight;
        var rangeOfKey = (docHeight * 2) / totalKeys;
        var arr = new Array();
        var i = 0;
        for (; i < base.whiteKey.length; i++) {
            arr.push(rangeOfKey * i);
        }
        return arr;
    };

    base.removeActiveScroll = function(pos) {
        var position = base.currentKey(),
            activeKey = position[pos],
            allActive = base.activeElements,
            i = 0;

        for (; i < allActive.length; i++) {
            if (activeKey !== base.whiteKey[i]){
                console.log(allActive[i] + " current active");
                base.replaceClassName(base.whiteKey[i]);
            }
        }
    };

    base.pressKeys = function() {
        var totalKeys = base.whiteKey.length;
        var docHeight = document.childNodes[1].offsetHeight;
        var rangeOfKey = (docHeight * 1.4) / totalKeys;
        var currentScroll = window.scrollY;
        var position = base.currentKey();

        var i = 0;
        for (; i < position.length; i++) {
            console.log(position[i] + " current Y");
            if (currentScroll > position[i] && currentScroll < (position[i] + rangeOfKey)) {
                base.whiteKey[i].className += " active";

                if (base.activeElements[i] !== position[i]) {
                    base.activeElements.push(position[i]);
                }
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




