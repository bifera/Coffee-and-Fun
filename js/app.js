$(function(){
    var menuBar = $('#menu-bar');
    var menuButton = $('#menu-toggle');
    var menuContent = $('#menu-content');
    var menuBackground = $('#menu-background');


    /*
    **
    *** MENU EFFECTS ***
    **
    */


    /* mobile menu toggle */
    menuButton.on('click', function(){
        menuContent.fadeToggle();
        menuBar.toggleClass('shadow-bar');
        menuBackground.fadeToggle(1200);
    });

    /* desktop and tablet sticky menu */

    var tablet = window.matchMedia("screen and (max-width: 1023px) and (min-width: 760px)");
    var desktop = window.matchMedia("screen and (min-width: 1024px)");

    function useStickyMenu(event){
        if (event.matches) {
            var menuBarPosition = menuBar.offset().top;
            var headerImageBottom = $('main').offset().top;
            $(window).on('scroll', function(){
                var scrolledAmount = $(document).scrollTop();
                if (scrolledAmount > menuBarPosition) {
                    menuBar.addClass('sticky');
                    if (scrolledAmount > headerImageBottom) {
                        menuBar.addClass('darker');
                    } else {
                        menuBar.removeClass('darker');
                    }
                } else {
                    menuBar.removeClass('sticky');
                }
            });
        }
    }

    useStickyMenu(tablet);
    useStickyMenu(desktop);

    tablet.addListener(useStickyMenu);
    desktop.addListener(useStickyMenu);

});