/**
 * Created by jessemaxwell on 1/7/14.
 */
var tabify = {
    hasClass: function(el, c) {
        return el.className.match(new RegExp('(\\s|^)'+c+'(\\s|&)'));
    },
    addClass: function(el, c) {
        if (!tabify.hasClass(el, c)) el.className += " " + c;
    },
    removeClass: function(el, c) {
        if (tabify.hasClass(el,c)) {
            el.className=el.className.replace(new RegExp('(\\s|^)'+c+'(\\s|$)'), (' '));
        }
    },
    hideAllTabs: function(ol) {
        var links = ol.getElementsByTagName("a");
        for (var i=0; i < links.length; i++) {
            tabify.setTabFromLink(links[i], "none");
        }
    },
    setTabFromLink: function(link, style) {
        var dest = link.href.match(/#(.*)$/)[1];
        document.getElementById(dest).style.display = style;
        if (style === "none") {
            tabify.removeClass(link, "active");
        } else {
            tabify.addClass(link, "active");
        }
    },
    addEvent: function(obj, type, fn) {
        if ( obj.attachEvent) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn] (window.event); };
            obj.attachEvent('on'+type, obj[type_fn] );
        } else {
            obj.addEventListener( type, fn, false );
        }
    },
    init: function() {
        var ols = document.getElementsByTagName("ol");
        for (var i=0; i < ols.length; i++) {
            var ol = ols[i];
            if (!/(^|\s)tablinks(\s|$)/.test(ol.className)) { continue; }
            tabify.addEvent(ol, "click", function(e) {
                var target = window.event ? window.event.srcElement : e.target;
                if (target.nodeName.toLowerCase() === "a") {
                    tabify.hideAllTabs(e.target.parentNode.parentNode);
                    tabify.setTabFromLink(e.target, "block");
                    if (e) e.preventDefault();
                    if (window.event) window.event.returnValue = false;
                    return false;
                }
            }, true);
            tabify.hideAllTabs(ol);
            tabify.setTabFromLink(ol.getElementsByTagName("a")[0], "block");
        }
    }
};
tabify.addEvent(window, "load", tabify.init);