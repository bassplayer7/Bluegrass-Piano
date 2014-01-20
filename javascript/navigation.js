/**
 * Developed by Jesse Maxwell for BluegrassPiano.com.
 */
var Navigation = function() {
    var base = this;

    base.navBar = document.getElementById("navigation");
    base.navElements = base.navBar.getElementsByTagName('li');
    base.pageContent = document.getElementById("page-content");
    base.everything = document.getElementById('nav-and-content');
    base.currentItem = document.getElementById("underline");
    base.docHeight = (document.childNodes[1].scrollHeight - document.childNodes[1].clientHeight) + document.childNodes[1].scrollTop;
    base.windowHeight = document.childNodes[1].clientHeight;
    base.menuIcon = document.getElementById('toggle-menu');
    base.windowWidth = document.childNodes[1].clientWidth;

    // Settings
    base.hMove = 50; // horizontal movement to be called a side-to-side movement
    base.vMove = 30; // vertical movement to be a up-or-down scroll type motion

    base.resetTouch = function() {
        base.xCoords = [];
        base.yCoords = [];
    };

    base.openMenu = function() {
        var x = base.lastTouchPlace,
            slideOpen = setInterval(function() {
                base.animateOpening(x);
                x += 2;
                if (x >= Math.round(base.windowWidth * 0.8)) {
                    clearInterval(slideOpen);
                    base.lastTouchPlace = 0;
                }
            }, 1);

        base.menuIsOpen = true;
        base.pageContent.addEventListener("click", base.closeMenu);
        base.pageContent.removeEventListener("touchend", base.openMenu);
        base.resetTouch();
    };

    base.closeMenu = function() {
        var x = base.lastTouchPlace,
            slideClose = setInterval(function() {
            base.animateClosing(x);
            x -= 2;
            if (x <= 0) {
                clearInterval(slideClose);
                base.lastTouchPlace = 0;
                base.pageContent.style.left = 0;
                base.menuIcon.style.left = "10px";
                }
            }, 1);

        base.menuIsOpen = false;
        base.pageContent.removeEventListener("touchend", base.closeMenu);
        base.resetTouch();
    };

    base.animateOpening = function(x) {
        base.pageContent.style.left = (x + 2) + "px";
        base.menuIcon.style.left = (x + 12) + "px";
    };

    base.animateClosing = function(x) {
        base.pageContent.style.left = (x - 2) + "px";
        base.menuIcon.style.left = ((x - 2) + 10) + "px";

//        for (var i = base.lastTouchPlace, j = 0; i >= j; i--) {
//            base.pageContent.style.left = (i - 1) + "px";
//        }
    };

    base.handleTouchMove = function(e) {
        var touch = e.changedTouches;

        if ((base.xCoords[base.xCoords.length - 1]) !== touch[0].clientX) {
            base.xCoords.push(touch[0].clientX);
        }

        if ((base.yCoords[base.yCoords.length - 1]) !== touch[0].clientY) {
            base.yCoords.push(touch[0].clientY);
        }

        if (base.xCoords[base.xCoords.length - 1] >= (base.xCoords[0] + base.hMove) &&
            base.yCoords[base.yCoords.length - 1] <= (base.yCoords[0] + base.vMove) &&
            base.yCoords[base.yCoords.length - 1] >= (base.yCoords[0] - base.vMove)) {
            base.pageContent.style.left = base.xCoords[base.xCoords.length - 1] + "px"; // follow the touch move
            base.menuIcon.style.left = (base.xCoords[base.xCoords.length - 1] + 10) + "px";

            if (!base.menuIsOpen) {
                base.pageContent.addEventListener("touchend", base.openMenu); // only if the menu is currently closed should it stay open
                base.lastTouchPlace = base.xCoords[base.xCoords.length - 1];
            }
        } else if (base.xCoords[base.xCoords.length - 1] <= (base.xCoords[0] - base.hMove) && // If you end up with a lower X then you started:
                   base.yCoords[base.yCoords.length - 1] <= (base.yCoords[0] + base.vMove) &&
                   base.menuIsOpen) {
            base.pageContent.style.left = base.xCoords[base.xCoords.length - 1] + "px"; // follow the touch move while closing
            base.menuIcon.style.left = (base.xCoords[base.xCoords.length - 1] + 10) + "px";
            base.pageContent.addEventListener("touchend", base.closeMenu); // when the touch is over, it is safe to close the menu
            base.lastTouchPlace = base.xCoords[base.xCoords.length - 1]; // for use in the sliding operation
        } else {
            base.pageContent.addEventListener("touchend", base.resetTouch);
        }
    };

    base.addActive = function(e) {
        e.target.className += " active";
        window.addEventListener("mouseout", base.removeActive, true);
    };

    base.removeActive = function(e) {
        var input = e.target;
        if (input !== undefined) {
            input.className = input.className.replace(/(?:^|\s)active(?!\S)/g , '' );
            return base;
        }
    };

    base.findElements = function() {
        var i = base.navElements.length - 1;
        for (; i >= 0; i--) {
            var navLink = base.navElements[i].childNodes[0];
            navLink.addEventListener("mouseover", base.addActive, true);
        }
    };

    base.slideUnderline = function(dest) {
        base.currentItem.style.width = base.navElements[dest].clientWidth + "px";
        base.currentItem.style.left = base.navElements[dest].offsetLeft + "px";
    };

    base.scrollLinks = function() {
        var scrollY = window.scrollY + base.navBar.clientHeight;
        for (var i = 0, j = base.trueArray.length; i < j; i++) {
            if (scrollY >= base.trueArray[i] && scrollY < base.trueArray[i + 1]) {
                base.slideUnderline(i);
                return;
            }
        }
    };

    base.setupScrollNav = function() {
        base.currentItem.style.width = base.navElements[0].clientWidth + "px";
        base.currentItem.style.left = base.navElements[0].offsetLeft + "px";
        // Turns on the underline span so that it displays on compatible (modern) browsers.
        base.currentItem.style.display = "block";

        for (var i = 0, j = base.destinationIds.length; i < j; i++) {
            if (base.destinationIds[i].id === base.sourceLinks[i].hash.substr(1)) {
                base.trueArray.push(base.destinationIds[i].offsetTop);
            }
        }
    };

    base.smallNavSize = function() {
        base.navBar.style.height = base.windowHeight + "px";
        base.everything.style.height = document.childNodes[1].scrollHeight + "px";
    };

    base.touchSmallNav = function() {
        base.pageContent.addEventListener("touchmove", base.handleTouchMove);

        for (var i = 0, j = base.navElements.length; i < j; i++) {
            base.navElements[i].childNodes[0].addEventListener("click", base.closeMenu, true); // If a link in the menu is tapped, close the menu
        }
    };

    base.load = function() {
        base.trueArray = [];
        base.destinationIds = document.getElementsByClassName('destination');
        base.sourceLinks = base.navBar.getElementsByTagName('a');

        if (document.childNodes[1].clientWidth >= 800) {
            // Full screen functions
            base.findElements();
            base.setupScrollNav();
            window.addEventListener("scroll", base.scrollLinks, true);
        } else {
            // Small screen functions.
            base.smallNavSize();
            base.menuIsOpen = false;
            base.xCoords = [];
            base.yCoords = [];
            base.touchSmallNav();
            base.lastTouchPlace = 0;
            base.menuIcon.addEventListener("click", base.openMenu, true);
        }


    };

};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);