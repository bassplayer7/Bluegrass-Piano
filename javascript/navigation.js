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
        menuIcon = $('svg.menu-icon');

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
    base.moveUnderline = function( ) {
        var positionTop = $( window ).scrollTop();

        for (var i = 0, j = sections.length; i < j; i++) {
            var currentNav = navBar.find('li').eq(i);
            if (positionTop < targetSections[1]) {
                base.initUnderline();
            } else if (positionTop >= targetSections[i] && positionTop <= targetSections[i + 1]) {
                underline.width( currentNav.width() ).css('left', currentNav.position().left);
            }
        }
    };

    base.smallNav = function() {
        menuIcon.on("click", function() {
            content.toggleClass('menu-open');
            console.log("SVG clicked");
            base.controlNav();
            return false;
        });

        navBar.find('a').click(function() {
            content.removeClass("menu-open");
        });

        content.on( "swiperight", base.handleSwipe );
        content.on( "swipeleft", base.handleSwipe );
    };

    base.handleSwipe = function( coords ) {
        console.log(coords.type);
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
            console.log("Determined that the menu is currently open");
            content.on("click", function() {
                content.removeClass("menu-open");
                console.log("Class Removed");
                $(this).off("click"); // remove the click handler so it doesn't fire many times
                return false;
            });
        }
    };

    base.load = function() {
        if ($( window).width() >= 800) {
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