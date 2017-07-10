$(function(){
    var menuBar = $('#menu-bar');
    var menuButton = $('#menu-toggle');
    var menuContent = $('#menu-content');
    var menuBackground = $('#menu-background');
    var menuAnchor = menuContent.find('a');

    /*
    **
    *** MENU EFFECTS ***
    **
    */


    /* mobile menu toggle */
    menuButton.on('click', function(){
        if (menuContent.is(':visible')) {
            menuContent.fadeOut(function(){
                menuBackground.slideUp();
                menuBar.addClass('shadow-bar');
                menuButton.removeClass('fa-close').addClass('fa-bars');
            });
        } else {
            menuBackground.slideDown(600, function(){
                menuContent.fadeIn();
                menuBar.removeClass('shadow-bar').removeClass('darker');
                menuButton.removeClass('fa-bars').addClass('fa-close');
            });   
        }
    });

    /* hide menu when any anchor clicked */
    var mobile = window.matchMedia("screen and (max-width: 759px)");
    function hideClickedMenu(event){
        if (event.matches) {
            menuAnchor.each(function(){
                $(this).on('click', function(){
                    menuContent.fadeOut();
                    menuBackground.fadeOut();
                    menuButton.removeClass('fa-close').addClass('fa-bars');
                });
            });
        }
    }
    
    hideClickedMenu(mobile);
    mobile.addListener(hideClickedMenu);


    /* desktop and tablet sticky menu */

    var tablet = window.matchMedia("screen and (max-width: 1023px) and (min-width: 760px)");
    var desktop = window.matchMedia("screen and (min-width: 1024px)");

    function useStickyMenu(event){
        if (event.matches) {
            var menuBarPosition = menuBar.offset().top;
            $(window).on('scroll', function(){
                var scrolledAmount = $(document).scrollTop();
                if (scrolledAmount > menuBarPosition) {
                    menuBar.addClass('sticky');

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


    /* menubar darkening */

    function darkenMenuBar(){
        var headerImageBottom = $('nav').height();
        $(window).on('scroll', function(){
            var scrolledAmount = $(document).scrollTop();
            if (scrolledAmount > headerImageBottom) {
                menuBar.addClass('darker');
            } else {
                menuBar.removeClass('darker');
            }
        });
    }

    darkenMenuBar();

    /*
    **
    *** NAVIGATION EFFECTS ***
    **
    */

    /* return to top button */
    
    var buttonToTop = $('#arrow-up');
    var headerImageBottom = $('nav').height();

    function showButtonTop(){
        $(window).on('scroll', function(){
            var scrolledAmount = $(document).scrollTop();
            if (scrolledAmount > headerImageBottom) {
                buttonToTop.fadeIn();
            } else {
                buttonToTop.fadeOut();
            }
        });
    }

    showButtonTop();

    /* smooth scrolling */

    function smoothScrolling(){
        menuAnchor.on('click', function(e){
            e.preventDefault();
            var anchor = $(this).attr('href');
            givenOffset = $(anchor).offset().top;
            $('html, body').animate({scrollTop: givenOffset}, 1200);
        });
    }

    smoothScrolling();
    
    
    /* post slider */
    
    var nextPostButton = $('#nextPost');
    var prevPostButton = $('#previousPost');
    var posts = $('.post');
    var postsList = $('.wrapper-content');
    var currentPostIndex = 1;
    var postWidth = $('.post').eq(currentPostIndex).width();
    
    postsList.width(postWidth*(posts.length+2));
    postsList.css('position', 'relative');
    postsList.css('left', postWidth*(-1));
    
    postSlider();
    
    desktop.addListener(postSlider);
    tablet.addListener(postSlider);
    mobile.addListener(postSlider);
    
    function postSlider(){
        var firstPostClone = posts.first().clone(true);
        var lastPostClone = posts.last().clone(true);
        
        postsList.append(firstPostClone);
        postsList.prepend(lastPostClone);
        
        nextPostButton.on('click', {value: +1}, startTheSlider);
        prevPostButton.on('click', {value: -1}, startTheSlider);
        
        function startTheSlider(event) {
            currentPostIndex = currentPostIndex+event.data.value;
            
            if (currentPostIndex === posts.length+1) {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200, function(){
                    postsList.css('left', (postWidth*-1));
                });
                currentPostIndex = 1;
            } else if (currentPostIndex === 0) {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200, function(){
                    postsList.css('left', (postWidth*(posts.length))*-1);
                });
                currentPostIndex = posts.length;
            } else {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200);
            }
        }
    }
});