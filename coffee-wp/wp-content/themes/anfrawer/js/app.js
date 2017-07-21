$(function(){
    $('#page-loader').delay(2000).fadeOut(function(){$('#preload').fadeOut(1500)});
    var menuBar = $('#menu-bar');
    var menuButton = $('#menu-toggle');
    var menuContainer = $('#menu-container');
    var menuContent = $('#menu-content');
    var stickyLogo = $('#logo-sticky');
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
            menuButton.on('tap', function(){
                if (menuContainer.hasClass('menu-background-mobile')) {
                    menuContent.fadeOut(600, function(){
                        menuContainer.removeClass('menu-background-mobile');
                        menuButton.removeClass('open');
                    });
                } else {
                    menuButton.addClass('open');
                    menuContainer.addClass('menu-background-mobile');
                    menuContent.fadeIn(600);
                }
            });
            menuAnchor.each(function(){
                $(this).on('tap', function(){
                    menuContent.fadeOut(600, function(){
                        menuContainer.removeClass('menu-background-mobile');
                        menuButton.removeClass('open');
                    });
                });
            });
            $(document).on('tap', function(e){
                // preventing event firing when tapped on .menu-container area:
                if (!$(e.target).closest('.menu-container').length) {
                    menuContent.fadeOut(600, function(){
                        menuContainer.removeClass('menu-background-mobile');
                        menuButton.removeClass('open');
                    });  
                }
            });
        }
    }

    useMobileMenu(mobile);
    mobile.addListener(useMobileMenu);

    /* desktop and tablet sticky menu */

    var tablet = window.matchMedia("screen and (min-width: 760px) and (max-width: 1023px)");
    var desktop = window.matchMedia("screen and (min-width: 1024px)");

    function useStickyMenu(event){
        if (event.matches) {
            /* necessary when resizing from mobile to wider screen */
            if (menuContent.not(':visible')) {
                menuContent.css('display', '');
            }
            var menuBarPosition = menuBar.offset().top; // for sticky class
            var headerImageBottom = $('nav').height(); // for darkening
            $(window).on('scroll', function(){
                var scrolledAmount = $(document).scrollTop();
                if (scrolledAmount > menuBarPosition) {
                    menuBar.addClass('sticky');
                } else {
                    menuBar.removeClass('sticky');
                }
                if (scrolledAmount > headerImageBottom) {
                    menuBar.addClass('darker');
                    stickyLogo.css('visibility', 'visible');
                } else {
                    menuBar.removeClass('darker');
                    stickyLogo.css('visibility', 'hidden');
                }
            });
        }
    }

    useStickyMenu(tablet);
    useStickyMenu(desktop);

    tablet.addListener(useStickyMenu);
    desktop.addListener(useStickyMenu);

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
                buttonToTop.addClass('arrow-visible');
            } else {
                buttonToTop.removeClass('arrow-visible');
            }
        });
    }

    showButtonTop();

    /* smooth scrolling */

    function smoothScrolling(target){
        var anchor = $(target).attr('href');
        givenOffset = $(anchor).offset().top;
        $('html, body').animate({scrollTop: givenOffset}, 1200);
    }

    menuAnchor.on('tap', function(){
        smoothScrolling($(this));
    })

    menuAnchor.on('click', function(){
        smoothScrolling($(this));
    });

    buttonToTop.find('a').on('tap', function(){
        smoothScrolling($(this));
    });

    buttonToTop.find('a').on('click', function(){
        smoothScrolling($(this));
    });


    stickyLogo.on('tap', function(){
        smoothScrolling($(this));
    });

    stickyLogo.on('click', function(){
        smoothScrolling($(this));
    });

    /* smooth scroll delay */

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
    *** PRODUCTS DISPLAY EFFECTS ***
    **
    */

    var products = $('.products-post');
    var popupBox = $('#products-popup-box');
    var popupBoxFrame = $('#products-popup-frame');
    var popupBoxCloseBtn = $('#products-popup-close');

    function displaySinglePostInfo(target) {
        var clonedContent = target.find('.products-post-content').clone(true);
        clonedContent.appendTo(popupBoxFrame);
        popupBox.fadeIn(800);
    }

    function closePopupBox(){
        var contentToDelete = popupBox.find('.products-post-content');
        popupBox.fadeOut(800, function(){
            contentToDelete.remove();
        });
    }

    products.each(function(){
        $(this).on('tap', function(e){
            // prevents from firing when window tapped to close menu, not to show product
            if (menuContent.is(':visible')){
                e.preventDefault();
            } else {
                displaySinglePostInfo($(this));
            } 
        });
    });

    products.each(function(){
        $(this).on('click', function(e){
            if (menuContent.is(':visible')){
                e.preventDefault();
            } else {
                displaySinglePostInfo($(this));
            }
        });
    });

    popupBoxCloseBtn.on('tap', function(){
        closePopupBox();
    });

    popupBoxCloseBtn.on('click', function(){
        closePopupBox();
    });

    popupBox.on('click', function(e){
        if (!$(e.target).closest(popupBoxFrame).length){
            closePopupBox();
        }
    });

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