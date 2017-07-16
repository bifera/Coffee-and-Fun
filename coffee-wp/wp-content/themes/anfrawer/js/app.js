$(function(){
    $('#page-loader').delay(2000).fadeOut(function(){$('#preload').fadeOut(1500)});
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
                        menuBar.addClass('shadow-bar').addClass('darker');
                        menuButton.removeClass('open');
                    });
                } else {
                    menuButton.addClass('open');
                    menuBackground.slideDown(600, function(){
                        menuContent.fadeIn();
                        menuBar.removeClass('shadow-bar').removeClass('darker');

                    });   
                }
            });
            menuAnchor.each(function(){
                $(this).on('click', function(){
                    menuContent.fadeOut();
                    menuBackground.fadeOut();
                    menuBar.addClass('darker').addClass('shadow-bar');
                    menuButton.removeClass('open');
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
            /* necessary when resizing from mobile to wider screen */
            if (menuContent.not(':visible')) {
                menuContent.css('display', '');
            }
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

        function animateSlider(){
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

        function startTheSlider(event) {
            currentPostIndex = currentPostIndex+event.data.value;
            animateSlider();
        }



        nextPostButton.on('click', {value: +1}, startTheSlider);
        prevPostButton.on('click', {value: -1}, startTheSlider);

        // animation on swipe: for mobile
        $('.post-wrapper').swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {
                if (direction == 'right') {
                    currentPostIndex--;
                } else if (direction == 'left') {
                    currentPostIndex++;
                }
                animateSlider();
            }
        });

        $(window).on('resize', function(){
            postsList.css('width', "");
            postWidth = $('.post').eq(1).width();
            postsList.css('left', postWidth*(-1));
            postsList.width(postWidth*(posts.length+2));
            currentPostIndex = 1;
        });

    }

    postSlider();

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
        var resetBtn = $('#reset');
        var sendingInfoBox = $('#sending-info');
        var sendingLoader = $('#sending-loader');

        /* single input validation result display */
        function validationResult(response, element){
            if (response == "error") {
                element.siblings('.error-message').fadeIn();
                element.siblings('.fa-check-circle').fadeOut();
            } else {
                element.siblings('.error-message').fadeOut();
                element.siblings('.fa-check-circle').fadeIn();
            }
        }

        /* validation functions for each input */
        function validateNameInput(){
            var validator = "";
            var givenName = nameInput.val();
            if (givenName.indexOf(" ") === -1 || givenName.indexOf(" ") === givenName.length-1) {
                validator = "error";
            } 
            validationResult(validator, nameInput);
        }

        function validateEmailInput(){
            var validator = "";
            var givenEmail = emailInput.val();
            if (givenEmail.indexOf("@") === -1 || givenEmail.indexOf(".") === -1 || givenEmail.lastIndexOf(".") < givenEmail.indexOf("@")) {
                validator = "error";
            } 
            validationResult(validator, emailInput);
        }

        function validatePhoneInput(){
            var validator = "";
            var givenPhone = phoneInput.val();
            for (var i = 0; i < givenPhone.length; i++) {
                if (givenPhone[i] >= "a" && givenPhone[i] <= "z") {
                    validator = "error";
                } 
                if (givenPhone[i] >= "A" && givenPhone[i] <= "Z") {
                    validator = "error";
                }
            }
            if (givenPhone.length < 9) {
                validator = "error";
            }
            validationResult(validator, phoneInput);
        }

        function validateMessageInput(){
            var validator = "";
            var givenMessage = messageInput.val();
            var errorField = messageInput.next();
            if (givenMessage.length === 0) {
                validator = "error";
            }
            validationResult(validator, messageInput);
        }


        /* validation: on change input event */

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

        /* ajax for contact form */
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
                sendingLoader.fadeOut(function(){
                    sendingInfoBox.addClass('success').text('Dziękujemy. Twoja wiadomość została wysłana.').fadeIn();
                    clearForm();
                });

            }).fail(function(error){
                sendingLoader.fadeOut(function(){
                    sendingInfoBox.addClass('error').text('Podczas wysyłania wystąpił błąd. Spróbuj ponownie później.').fadeIn();
                });

            });
        }

        /* another validation and sending on form submit event */
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
                sendingLoader.fadeIn();
                sendThisMessage();
            }
        });

        /* clearing contact form inputs */
        function clearForm(){
            $('input').each(function(){
                $(this).val('');
            });
            $('textarea').val('');
            $('.error-message').fadeOut();
            $('.fa-check-circle').fadeOut();
        }

        sendingInfoBox.on('click', function(){
            $(this).text('');
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
            } else if ($(this).hasClass('error')) {
                $(this).removeClass('error');
            };
        });

        resetBtn.on('click', function(){
            clearForm();
        });
    }

    contactForm();

});