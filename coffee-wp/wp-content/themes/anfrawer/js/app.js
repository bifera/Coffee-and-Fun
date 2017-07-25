$(function(){
    $('#page-loader').delay(2000).fadeOut(function(){$('#preload').fadeOut(1500)});
    var menuBar = $('#menu-bar');
    var menuButton = $('#menu-toggle');
    var menuContainer = $('#menu-container');
    var menuContent = $('#menu-content');
    var stickyLogo = $('#logo-sticky');
    var menuAnchors = menuContent.find('a');

    /*
    **
    *** MENU EFFECTS ***
    **
    */


    /* mobile menu toggle */
    var mobile = window.matchMedia("screen and (max-width: 759px)");

    function openMobileMenu(){
        menuButton.addClass('open');
        menuContainer.removeClass('mobile-closed').addClass('mobile-open');
        menuContent.fadeIn(600);

        /* close menu when nothing is done */
        var timeout = setTimeout(function(){
            closeMobileMenu();
        }, 4500);

    }

    function closeMobileMenu(){
        menuContent.fadeOut(600, function(){
            menuContainer.removeClass('mobile-open').addClass('mobile-closed');
            menuButton.removeClass('open');
        });
    }

    function useMobileMenu(event) {
        if (event.matches) {
            menuContainer.addClass('mobile-closed');

            menuButton.on('click', function(){
                if (menuContainer.hasClass('mobile-open')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            menuAnchors.each(function(){
                $(this).on('click', function(){
                    closeMobileMenu();
                });
            });

            $(document).on('click', function(e){
                // preventing event firing when tapped on .menu-container area:
                if (!$(e.target).closest(menuContainer).length) {
                    closeMobileMenu();  
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

    menuAnchors.each(function(){
        $(this).on('click', function(){
            smoothScrolling($(this));
        });
    });

    buttonToTop.find('a').on('click', function(){
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

    var products = $('.wp-products-post');
    var popupBox = $('#products-popup-box');
    var popupBoxFrame = $('#products-popup-frame');
    var popupBoxCloseBtn = $('#products-popup-close');

    function displaySinglePostInfo(target) {
        var clonedContent = target.find('.wp-products-post-content').clone(true);
        console.log(clonedContent);
        clonedContent.appendTo(popupBoxFrame);
        popupBox.fadeIn(800);
    }

    function closePopupBox(){
        var contentToDelete = popupBox.find('.wp-products-post-content');
        popupBox.fadeOut(800, function(){
            contentToDelete.remove();
        });
    }

    products.each(function(){
        $(this).on('click', function(e){
            // prevents from firing when window tapped to close menu, not to show product
            if (menuContainer.hasClass('menu-background-mobile')){
                e.preventDefault();
            } else {
                displaySinglePostInfo($(this));
            } 
        });
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
        var userDataInputs = $('input:not([type="checkbox"])');
        var nameInput = $('#name');
        var emailInput = $('#email');
        var phoneInput = $('#phone');
        var messageInput = $('#message');
        var formProducts = $('.form-products');
        var submitBtn = $('#submit');
        var resetBtn = $('#reset');
        var errorMessageBoxes = $('.error-message');
        var sendingInfoBox = $('#sending-info');
        var sendingLoader = $('#sending-loader');

        /* single input validation result display */
        function validationResult(response, element){
            element.siblings('.fa').hide();
            if (response == "error") {
                element.siblings('.error-message').fadeIn();
                element.siblings('.fa').addClass('fa-minus-square').removeClass('fa-check-square').fadeIn();
            } else {
                element.siblings('.error-message').fadeOut();
                element.siblings('.fa').addClass('fa-check-square').removeClass('fa-minus-square').fadeIn();
            }
        }
        
        /* validation functions for each input */
        
        var validator = "";
        
        function validateNameInput(){
            var givenName = nameInput.val();
            if (givenName.indexOf(" ") === -1 || givenName.indexOf(" ") === givenName.length-1) {
                validator = "error";
            } 
            validationResult(validator, nameInput);
        }

        function validateEmailInput(){
            var givenEmail = emailInput.val();
            if (givenEmail.indexOf("@") === -1 || givenEmail.indexOf(".") === -1 || givenEmail.lastIndexOf(".") < givenEmail.indexOf("@")) {
                validator = "error";
            } 
            validationResult(validator, emailInput);
        }

        function validatePhoneInput(){
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
            var coffeeData = "";
            for (var i = 0; i < formProducts.length; i ++) {
                if (formProducts.eq([i]).is(':checked')) {
                    coffeeData += " " + formProducts.eq([i]).val();
                }
            }

            var postData = {
                "submittedName" : $('#name').val(),
                "submittedEmail" : $('#email').val(),
                "submittedPhone" : $('#phone').val(),
                "submittedMessage" : $('#message').val(),
                "submittedCoffee" : coffeeData
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
            errorMessageBoxes.each(function(){
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
            userDataInputs.each(function(){
                $(this).val('');
            });
            $('textarea').val('');
            errorMessageBoxes.each(function(){
                $(this).fadeOut();
            });
            $('form .fa').each(function(){
                $(this).removeClass('fa-check-square fa-minus-square');
            });
            formProducts.each(function(){
                $(this).prop('checked', false);
            });
        }

        sendingInfoBox.on('click', function(){
            $(this).hide().text('').removeClass('error success');
        });

        resetBtn.on('click', function(){
            clearForm();
            sendingInfoBox.hide().text('').removeClass('error success');
        });
    }

    contactForm();

});