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
    var mobile = window.matchMedia("screen and (max-width: 759px)");

    function useMobileMenu(event) {
        if (event.matches) {
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
            menuAnchor.each(function(){
                $(this).on('click', function(){
                    menuContent.fadeOut();
                    menuBackground.fadeOut();
                    menuButton.removeClass('fa-close').addClass('fa-bars');
                });
            });
        }
    }

    useMobileMenu(mobile);
    mobile.addListener(useMobileMenu);

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


    function postSlider(){

        var firstPostClone = posts.first().clone(true);
        var lastPostClone = posts.last().clone(true);

        postsList.append(firstPostClone);
        postsList.prepend(lastPostClone);


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

        nextPostButton.on('click', {value: +1}, startTheSlider);
        prevPostButton.on('click', {value: -1}, startTheSlider);

        $(window).on('resize', function(){
            postsList.css('width', "");
            postWidth = $('.post').eq(1).width();
            postsList.css('left', postWidth*(-1));
            postsList.width(postWidth*(posts.length+2));
            currentPostIndex = 1;
        });

    }

    postSlider();

    /* update slider size after window resize */



    /* scroll delay */

    function scrollSectionsDelay(){
        $(window).on('scroll', function () {
            var distance = $(window).innerHeight();
            $('.scrolled').each(function(index,value){
                var elementPosition = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (elementPosition < topOfWindow + distance) {
                    $(this).addClass('slideUp');
                }
            });

        });
    }

    scrollSectionsDelay();

    /*
    **
    *** CONTACT FORM ***
    **
    */

    function contactForm(){
        var nameInput = $('#name');
        var emailInput = $('#email');
        var phoneInput = $('#phone');
        var messageInput = $('#message');
        var submitBtn = $('#submit');
        var sendingInfoBox = $('.sending-info');

        function validateNameInput(){
            var givenName = nameInput.val();
            var errorField = nameInput.next();
            if (givenName.indexOf(" ") === -1 || givenName.indexOf(" ") === givenName.length-1) {
                errorField.slideDown();
            }
        }

        function validateEmailInput(){
            var givenEmail = emailInput.val();
            var errorField = emailInput.next();
            if (givenEmail.indexOf("@") === -1 || givenEmail.indexOf(".") === -1 || givenEmail.lastIndexOf(".") < givenEmail.indexOf("@")) {
                errorField.slideDown();
            } 
        }

        function validatePhoneInput(){
            var givenPhone = phoneInput.val();
            var errorField = phoneInput.next();
            var invalidInputValue = false;
            for (var i = 0; i < givenPhone.length; i++) {
                if (givenPhone[i] >= "a" && givenPhone[i] <= "z") {
                    invalidInputValue = true;
                } 
                if (givenPhone[i] >= "A" && givenPhone[i] <= "Z") {
                    invalidInputValue = true;
                }
            }
            if (givenPhone.length < 9) {
                invalidInputValue = true;
            }
            if (invalidInputValue) {
                errorField.slideDown();
            }
        }

        function validateMessageInput(){
            var givenMessage = messageInput.val();
            var errorField = messageInput.next();
            if (givenMessage.length === 0) {
                errorField.slideDown();
            }
        }

        nameInput.on('change', function(){
            validateNameInput();
        });

        emailInput.on('change', function(){
            validateEmailInput();
        });

        phoneInput.on('change', function(){
            validatePhoneInput();
        });

        messageInput.on('change', function(){
            validateMessageInput();
        });

        nameInput.on('focus', function(){
            $(this).next().slideUp();
        });

        emailInput.on('focus', function(){
            $(this).next().slideUp();
        });

        phoneInput.on('focus', function(){
            $(this).next().slideUp();
        });

        messageInput.on('focus', function(){
            $(this).next().slideUp();
        });

        function sendThisMessage(){
            var postData = {
                "submittedName" : $('#name').val(),
                "submittedEmail" : $('#email').val(),
                "submittedPhone" : $('#phone').val(),
                "submittedMessage" : $('#message').val()
            }

            $.ajax({
                type: 'POST',
                url: $('form').attr('action'),
                data: postData
            }).done(function(response){
                $('.sending-info').addClass('success').text('Dziękujemy. Twoja wiadomość została wysłana.').slideDown();
            }).fail(function(error){
                $('.sending-info').addClass('error').text('Podczas wysyłania wystąpił błąd. Spróbuj ponownie później.').slideDown();
            });
        }

        submitBtn.on('click', function(){
            validateNameInput();
            validateEmailInput();
            validatePhoneInput();
            validateMessageInput();
            var validationResult = true;
            $('.error-message').each(function(){
                if ($(this).is(':visible')) {
                    validationResult = false;
                }
            });

            if (validationResult === true){
                sendThisMessage();
            }
        });

        function clearForm(){
            sendingInfoBox.on('click', function(){
                $(this).text('');
                if ($(this).hasClass('success')) {
                    $(this).removeClass('success');
                } else if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                }
            });

            $('#reset').on('click', function(){
                $('input').each(function(){
                    $(this).val('');
                });
                $('textarea').val('');
            });
        }
        clearForm();
    }

    contactForm();

});