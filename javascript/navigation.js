/**
 * Created by jessemaxwell on 1/14/14.
 */
var Navigation = function() {
    var base = this;
    base.navBar = document.getElementById("navigation");
    base.navElements = base.navBar.getElementsByTagName('li');
    base.currentItem = document.getElementById("underline");
    base.docHeight = document.childNodes[1].scrollHeight - document.childNodes[1].clientHeight;
    base.windowHeight = document.childNodes[1].clientHeight;

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
        var destinationIds = document.querySelectorAll('div[id]'),
            sourceLinks = base.navBar.getElementsByTagName('a');

        var i = 0;
        for (; i < destinationIds.length; i++) {
            if (destinationIds[i].id === sourceLinks[i].hash.substr(1)) {
                base.trueArray.push(destinationIds[i].offsetTop);
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
        base.currentItem.style.display = "block";
    };

    base.load = function() {
        base.trueArray = [];
        base.findElements();
        base.initialUnderline();
        base.findMatches();

        window.addEventListener("scroll", base.scrollLinks, true);
    };

};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);