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

    base.openMenu = function() {
        base.pageContent.style.left = (base.windowWidth * 0.8) + "px";
        base.menuIcon.style.left = base.pageContent.style.left;
        base.pageContent.addEventListener("click", base.closeMenu, true);
    };

    base.closeMenu = function() {
        base.pageContent.style.left = 0;
        base.menuIcon.style.left = "10px";
    };

    base.finishMenuDrag = function() {
        // decide if the touch was opening or closing the menu.
        if (base.currentXCoords <= base.previousXCoords) {
            base.closeMenu();
            base.previousXCoords = base.currentXCoords;
            base.xCoords = [];
        } else {
            base.openMenu();
            base.previousXCoords = base.currentXCoords;
            base.xCoords = [];
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
        var destinationIds = document.getElementsByClassName('destination'),
            sourceLinks = base.navBar.getElementsByTagName('a');

        for (var i = 0, j = destinationIds.length; i < j; i++) {
            if (destinationIds[i].id === sourceLinks[i].hash.substr(1)) {
                base.trueArray.push(destinationIds[i].offsetTop);
            }
        }

        for (var i = 0, j = destinationIds.length; i < j; i ++) {
            if (!sourceLinks[i]) {
                return false;
            } else {
                console.log(sourceLinks[i].hash);
                for (var k = 0, l = sourceLinks.length; k < l; k++) {
                    if (destinationIds[i].id === sourceLinks[k].hash.substr(1)) {
                        base.trueArray.push(destinationIds[i].offsetTop);
                        console.log(base.trueArray);
                    } else {
                        console.log("No matches found");
                    }
                }
            }
        }


//        var source = sourceLinks[i];
//        console.log(sourceLinks[i]);
//        if (source) {
//            for (var j = 0; j < sourceLinks.length; j++) {
//                if (destinationIds[i].id === sourceLinks[j].hash.substr(1)) {
//                    base.trueArray.push(destinationIds[i].offsetTop);
//                    console.log("Added an item");
//                }
//            }
//        }
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
        base.xCoords.push(e.changedTouches[0].clientX);
        console.log(e.changedTouches[0].touchIdentifier);
        if (base.xCoords[0] > (base.xCoords[base.xCoords.length - 1] - 50)) {
            base.currentXCoords = e.changedTouches[0].clientX;
            base.pageContent.style.left = base.currentXCoords + "px";
            base.menuIcon.style.left = base.currentXCoords + "10px";
            base.pageContent.addEventListener("touchend", base.finishMenuDrag, true);
        }
    };

    base.touchSmallNav = function() {
        base.pageContent.addEventListener("touchmove", base.dragMenu, true);

        for (var i = 0, j = base.navElements.length; i < j; i++) {
            base.navElements[i].childNodes[0].addEventListener("click", base.closeMenu, true);
        }
    };

    base.load = function() {
        base.trueArray = [];

        if (document.childNodes[1].clientWidth >= 800) {
            // Full screen functions
            base.findElements();
            base.initialUnderline();
            base.findMatches();
        } else {
            // Small screen functions.
            base.smallNavSize();
            base.previousXCoords = 0;
            base.currentXCoords = 0;
            base.xCoords = [];
            base.pageContent.addEventListener("touchstart", base.touchSmallNav, true);
            base.menuIcon.addEventListener("click", base.openMenu, true);
        }

        window.addEventListener("scroll", base.scrollLinks, true);
    };

};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);