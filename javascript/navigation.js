/**
 * Created by jessemaxwell on 3/1/14.
 */

var Navigation = function() {
    var base = this;

    var navBar = $('nav.page-links'),
        underline = $('#underline'),
        sections = $('.destination'),
        targetSections = [],
        content = $('.inner'),
        menuIcon = $('svg.menu-icon'),
        scrollHandling = {
            allow: true,
            reallow: function() {
                scrollHandling.allow = true;
            },
            delay: 100 //(milliseconds) adjust to the highest acceptable value
        };

    // display underline if JS is available and set it to the width of the first nav item
    base.initUnderline = function() {
        var firstNavWidth = navBar.find('li:first-child').width(),
            firstNavLeft = navBar.find('li:first-child').position().left;

        underline.width( firstNavWidth ).css('left', firstNavLeft).css('display', 'block');
    };

    // run through and match destinations with their link
    base.setupNavItems = function() {
        for (var i = 0, j = sections.length; i < j; i++) {
            if (navBar.find('a')[i].hash.substr(1) === sections[i].id) {
                targetSections.push(Math.round(sections.eq(i).position().top));
            }
        }
    };

    // move underline as the page scrolls
    base.moveUnderline = function() {
        if (scrollHandling.allow){
            var positionTop = $( window ).scrollTop() + navBar.height();

            for (var i = 0, j = sections.length; i < j; i++) {
                if (positionTop < targetSections[1]) {
                    base.initUnderline();
                    return;
                } else if (positionTop >= targetSections[targetSections.length - 1]) {
                    underline.width( navBar.find('li').eq(targetSections.length - 1).width() ).css('left', navBar.find('li').eq(targetSections.length - 1).position().left);
                    return;
                } else if (positionTop >= targetSections[i] && positionTop <= targetSections[i + 1]) {
                    underline.width( navBar.find('li').eq(i).width() ).css('left', navBar.find('li').eq(i).position().left);
                    return;
                }
            }

            scrollHandling.allow = false;
            setTimeout(scrollHandling.reallow, scrollHandling.delay);
        }
    };

    base.smallNav = function() {
        menuIcon.on("click", function() {
            content.toggleClass('menu-open');
            base.controlNav();
            return false;
        });

        navBar.find('a').click(function() {
            content.removeClass("menu-open");
        });

        content.hammer().on( "swiperight", base.handleSwipe );
        content.hammer().on( "swipeleft", base.handleSwipe );
    };

    base.handleSwipe = function( coords ) {
        if (coords.type === "swiperight") {
            content.addClass('menu-open');
            base.controlNav();
        } else {
            content.removeClass('menu-open');
        }
        return false;
    };

    base.controlNav = function() {
        if (content.hasClass("menu-open")) {
            content.on("click", function() {
                content.removeClass("menu-open");
                $(this).off("click"); // remove the click handler so it doesn't fire many times
                return false;
            });
        }
    };

    base.load = function() {
        if ($( window ).width() >= 800) {
            base.initUnderline();
            base.setupNavItems();
            $(window).on("resize", base.initUnderline);
            $(window).scroll(base.moveUnderline);
        } else {
            base.smallNav();
        }
    };
};

var navigation = new Navigation();

$(document).ready( navigation.load );