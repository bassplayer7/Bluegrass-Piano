/**
 * Created by jessemaxwell on 1/14/14.
 */
var Navigation = function() {
    var base = this;

    base.navBar = document.getElementById("navigation");
    base.navElements = base.navBar.getElementsByTagName('li');
    base.pageContent = document.getElementById("page-content");
    base.everything = document.getElementById('nav-and-content');
    base.currentItem = document.getElementById("underline");
    base.docHeight = document.childNodes[1].scrollHeight - document.childNodes[1].clientHeight;
    base.windowHeight = document.childNodes[1].clientHeight;
    base.menuIcon = document.getElementById('toggle-menu');
    base.windowWidth = document.childNodes[1].clientWidth;

    // Settings
    base.hortMove = 50; // horizontal movement to be called a side-to-side movement
    base.vertMove = 40; // vertical movement to be a up-or-down scroll type motion

    base.resetTouch = function() {
        base.xCoords = [];
        base.yCoords = [];
    };

    base.openMenu = function() {
        base.pageContent.style.left = (base.windowWidth * 0.8) + "px";
        base.menuIcon.style.left = base.pageContent.style.left;
//        base.pageContent.addEventListener("click", base.closeMenu, true);
        base.menuIsOpen = true;
        console.log("Menu opened");
        base.resetTouch();
    };

    base.closeMenu = function(e) {
        base.pageContent.style.left = 0;
        base.menuIcon.style.left = "10px";
        base.menuIsOpen = false;
        console.log(e);
        console.log("Menu has been closed");
        base.resetTouch();
    };

    base.finishMenuDrag = function() {
        // decide if the touch was opening or closing the menu.
        if (base.currentXCoords <= base.previousXCoords) {
//            base.closeMenu();
            base.previousXCoords = base.currentXCoords;
            base.xCoords = [];
            base.yCoords = [];
        } else {
            base.openMenu();
            base.previousXCoords = base.currentXCoords;
            base.xCoords = [];
            base.yCoords = [];
        }
    };

    base.addActive = function(e) {
        e.target.className += " active";
        window.addEventListener("mouseout", base.removeActive, true);
    };

    base.removeActive = function(e) {
        var target = e.target;
        base.replaceClassName(target);
    };

    base.replaceClassName = function(input) {
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

    base.findMatches = function() {
        for (var i = 0, j = base.destinationIds.length; i < j; i++) {
            if (base.destinationIds[i].id === base.sourceLinks[i].hash.substr(1)) {
                base.trueArray.push(base.destinationIds[i].offsetTop);
            }
        }
    };

    base.slideUnderline = function(dest) {
        base.currentItem.style.width = base.navElements[dest].clientWidth + "px";
        base.currentItem.style.left = base.navElements[dest].offsetLeft + "px";
    };

    base.scrollLinks = function() {
        var scrollY = window.scrollY + base.navBar.clientHeight;
        for (var i = 0; i < base.trueArray.length; i++) {
            if (scrollY >= base.trueArray[i] && scrollY < base.trueArray[i + 1]) {
                base.slideUnderline(i);
            }
        }
    };

    base.initialUnderline = function() {
        base.currentItem.style.width = base.navElements[0].clientWidth + "px";
        base.currentItem.style.left = base.navElements[0].offsetLeft + "px";
        // Turns on the underline span so that it displays on compatible (modern) browsers.
        base.currentItem.style.display = "block";
    };

    base.smallNavSize = function() {
        base.navBar.style.height = base.windowHeight + "px";
        base.everything.style.height = base.docHeight + "px";
    };

    base.dragMenu = function(e) {
        var touch = e.changedTouches;

        if ((base.xCoords[base.xCoords.length - 1]) !== touch[0].clientX) {
            base.xCoords.push(touch[0].clientX);
        }

        if ((base.yCoords[base.yCoords.length - 1]) !== touch[0].clientY) {
            base.yCoords.push(touch[0].clientY);
        }

//        base.xCoords = [30, 233, 234];
//        base.yCoords = [338, 339, 340];

        console.log(base.xCoords);
        console.log(base.yCoords);

//        if (base.menuIsOpen === false) {
            if (base.menuIsOpen === false
            &&  base.xCoords[base.xCoords.length - 1] >= (base.xCoords[0] + base.hortMove)
            &&  base.yCoords[base.yCoords.length - 1] <= (base.yCoords[0] + base.vertMove)) {
                base.currentXCoords = e.changedTouches[0].clientX;
                base.pageContent.style.left = base.currentXCoords + "px";
                base.menuIcon.style.left = base.currentXCoords + "10px";
                base.pageContent.addEventListener("touchend", base.openMenu, true);
                console.log("Open this menu");
//                base.openMenu();
//                base.xCoords = [234, 233, 30];
                return;
            } else if (base.menuIsOpen === true
                   && (base.xCoords[base.xCoords.length - 1] <= (base.xCoords[0] + base.hortMove)) // If you end up with a lower X then you started:
                   && (base.yCoords[base.yCoords.length - 1] <= (base.yCoords[0] + base.vertMove))) {
                base.pageContent.style.left = base.currentXCoords + "px";
                base.menuIcon.style.left = base.currentXCoords + "10px";
//                console.log("Tell the menu to close");
                base.pageContent.addEventListener("touchend", base.closeMenu, true);
//                base.closeMenu();
                return;
            } else {
                base.pageContent.addEventListener("touchend", base.resetTouch, true);
            }
//        }

//        if (base.menuIsOpen === true) {
//            if ((base.xCoords[base.xCoords.length - 1] <= (base.xCoords[0] + base.hortMove)) // If you end up with a lower X then you started:
//                && (base.yCoords[base.yCoords.length - 1] <= (base.yCoords[0] + base.vertMove))) {
//                base.pageContent.style.left = base.currentXCoords + "px";
//                base.menuIcon.style.left = base.currentXCoords + "10px";
//                console.log("Close this menu");
//                base.pageContent.addEventListener("touchend", base.closeMenu, true);
//            } else {
//                base.pageContent.addEventListener("touchend", base.resetTouch, true);
//            }
//        }
    };

    base.touchSmallNav = function() {
        base.pageContent.addEventListener("touchmove", base.dragMenu, true);

        for (var i = 0, j = base.navElements.length; i < j; i++) {
            base.navElements[i].childNodes[0].addEventListener("click", base.closeMenu, true);
        }
    };

    base.load = function() {
        base.trueArray = [];
        base.destinationIds = document.getElementsByClassName('destination');
        base.sourceLinks = base.navBar.getElementsByTagName('a');

        if (document.childNodes[1].clientWidth >= 800) {
            // Full screen functions
            base.findElements();
            base.initialUnderline();
            base.findMatches();
        } else {
            // Small screen functions.
            base.smallNavSize();
            base.menuIsOpen = false;
            base.previousXCoords = 0;
            base.currentXCoords = 0;
            base.xCoords = [];
            base.yCoords = [];
            base.pageContent.addEventListener("touchstart", base.touchSmallNav, true);
            base.menuIcon.addEventListener("click", base.openMenu, true);
        }

        window.addEventListener("scroll", base.scrollLinks, true);
    };

};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);