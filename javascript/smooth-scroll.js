$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - navHeight())
                }, 500);
                return false;
            }
        }
    });
});

navHeight = function() {
    if ($( window ).width() >= 800) {
        var navBarHeight = $('#navigation').height();
    } else {
        var navBarHeight = 0;
    }
    return navBarHeight;
};

$(function() {
    $('a.return-top').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});