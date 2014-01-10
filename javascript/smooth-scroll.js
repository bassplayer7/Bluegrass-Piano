/**
 * Created by jessemaxwell on 1/10/14.
 */
var Scrolling = function() {
    var base = this;

    base.currentYPosition = function() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    };

    base.elmYPosition = function(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    };

    base.smoothScroll = function(evt) {
        var eID = evt.toElement.hash.substr(1);
        var startY = base.currentYPosition();
        var stopY = base.elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
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
    }
}

var smoothlyScroll = new Scrolling();

window.addEventListener("load", smoothlyScroll.smoothScrollAll);