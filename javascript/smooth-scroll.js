/**
 * Created by jessemaxwell on 1/10/14.
 */
var Scrolling = function() {
    var base = this;

    base.currentYPosition = function() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
            return self.pageYOffset; // to compensate for the fixed nav menu
        }
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
            return document.body.scrollTop;
        }

        return 0;
    };

    base.elmYPosition = function(eID) {
        var elm = document.getElementById(eID).childNodes[1];
        var y = elm.offsetTop - elm.clientHeight - navigation.navBar.clientHeight; // to compensate for the fixed nav menu
        console.log("y = " + y);
        console.log("clientHeight = " + navigation.navBar.clientHeight);
        console.log("offsetTop = " + elm.offsetTop);
        while (elm.offsetParent && elm.offsetParent !== document.body) {
            console.log("elm = " + elm);
            elm = elm.offsetParent;
            y += elm.offsetTop;
        } return y;
    };

    base.smoothScroll = function(evt) {
        var eID = evt.toElement.hash.substr(1);
        var startY = base.currentYPosition();
        var stopY = base.elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
//        console.log("distance = " + stopY);
        if (distance < 150) {
//            console.log("Distance was less then 150 and stopY is " + stopY + " - " + navigation.navBar.clientHeight);
//            var shortStop = stopY - navigation.navBar.clientHeight;
            window.scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        console.log("stopY = " + stopY);
        if (speed >= 20) {
            speed = 20;
        }
        var step = Math.round(distance / 25);
//        console.log("step = " + step);
        var leapY = stopY > startY ? startY + step : startY - step;
//        console.log("leapY = " + leapY);
        var timer = 0;
        if (stopY > startY) {
//            console.log("StopY is > startY");
            for ( var i = startY; i < stopY; i += step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step;
                if (leapY > stopY) {
                    leapY = stopY;
                }
                timer++;
            }
            return;
        }
        for ( var j = startY; j > stopY; j -= step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step;
            if (leapY < stopY) {
                leapY = stopY;
            }
            timer++;
        }
    };

    base.smoothScrollAll = function() {
        var pageLinks = document.getElementsByTagName('a');
        var i = 0;
        for (; i < pageLinks.length; i++) {
            if (pageLinks[i].hash) {
                pageLinks[i].addEventListener("click", base.smoothScroll, true);
            }
        }
    };
};

var smoothlyScroll = new Scrolling();

window.addEventListener("load", smoothlyScroll.smoothScrollAll);