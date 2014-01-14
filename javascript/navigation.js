/**
 * Created by jessemaxwell on 1/14/14.
 */
var Navigation = function() {
    var base = this;
    base.navBar = document.getElementById("navigation");
    base.navElements = base.navBar.getElementsByTagName('li');
    base.currentItem = document.getElementById("underline");

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
        console.log(destinationIds);

        var i = 0;
        for (; i < destinationIds.length; i++) {
            if (destinationIds[i] === sourceLinks[i].hash) {
                console.log("I have found good hashes");
            } else {
                console.log(destinationIds[i] + " I didn't find anything");
                console.log(sourceLinks[i].hash + " This was the sourceLink");
            }
        }
    };

    base.setNavElement = function() {
        base.currentItem.style.width = base.navElements[0].clientWidth + "px";
        base.currentItem.style.left = base.navElements[0].offsetLeft + "px";
        base.currentItem.style.display = "block";
    };

    base.load = function() {
        base.findElements();
        base.setNavElement();
        base.findMatches();

        window.addEventListener("resize", base.divideElements, true);
    };

};

var navigation = new Navigation();
window.addEventListener("load", navigation.load, true);