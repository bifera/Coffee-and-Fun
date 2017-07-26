$(function(){
    $('#page-loader').delay(2000).fadeOut(function(){$('#preload').fadeOut(1500);});

    /* variables for media queries */
    var mobile = window.matchMedia("screen and (max-width: 759px)");
    var tablet = window.matchMedia("screen and (min-width: 760px) and (max-width: 1024px)");
    var desktop = window.matchMedia("screen and (min-width: 1025px)");

    /*******************
    ********************
    *** MENU EFFECTS ***
    ********************
    *******************/

    /* menu variables */
    var menuBar = $('#menu-bar');
    var menuButton = $('#menu-toggle');
    var menuContainer = $('#menu-container');
    var menuContent = $('#menu-content');
    var stickyLogo = $('#logo-sticky');
    var menuAnchors = menuContent.find('a');


    /* ===== mobile menu ===== */

    function openMobileMenu(){
        menuButton.addClass('open');
        menuContainer.removeClass('mobile-closed').addClass('mobile-open');
        menuContent.fadeIn(600);

        var timeout = setTimeout(function(){ //close menu when nothing is done 
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
            menuContainer.addClass('mobile-closed'); // hide menu container
            menuButton.on('click', function(){
                if (menuContainer.hasClass('mobile-open')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            menuAnchors.each(function(){ // close menu after clicking an anchor
                $(this).on('click', function(){
                    closeMobileMenu();
                });
            });

            $(document).on('click', function(e){ // click anywhere to close menu
                // preventing event firing when tapped on .menu-container area:
                if (!$(e.target).closest(menuContainer).length) {
                    closeMobileMenu();  
                }
            });
        }
    }

    useMobileMenu(mobile);
    mobile.addListener(useMobileMenu);

    /* ===== desktop and tablet sticky menu ===== */

    function useStickyMenu(event){
        if (event.matches) {
            if (menuContent.not(':visible')) { //necessary when resizing from mobile to wider screen
                menuContent.css('display', '');
            }
            var menuBarPosition = menuBar.offset().top; // for sticky class: right after scroll start
            var headerImageBottom = $('nav').height(); // for darkening: after leaving header image area

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

    /*************************
    **************************
    *** NAVIGATION EFFECTS ***
    **************************
    *************************/

    /*=== show return to top button after leaving header image ===*/
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

    /*==== smooth scrolling after clicking on page anchors ====*/
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

    /*==== slide up style delay when page scrolled down for the first time ====*/
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

    /*******************************
    ********************************
    *** PRODUCTS DISPLAY EFFECTS ***
    ********************************
    *******************************/

    /* products variables */
    var products = $('.wp-products-post');
    var popupContainer = $('#products-popup-container');
    var popupBox = $('#products-popup-box');
    var popupBoxCloseBtn = $('#products-popup-close');

    /*=== clone, append and display cloned product info in popup box ===*/
    function displaySinglePostInfo(target) {
        var clonedContent = target.find('.wp-products-post-content').clone(true);
        clonedContent.appendTo(popupBox);
        popupContainer.fadeIn(600);
    }

    /*=== close and empty popup box ===*/
    function closePopupBox(){
        var contentToDelete = popupContainer.find('.wp-products-post-content');
        popupContainer.fadeOut(600, function(){
            contentToDelete.remove();
        });
    }

    /*=== events to trigger display single product ===*/
    products.each(function(){
        $(this).on('click', function(event){
            if (menuContainer.hasClass('menu-background-mobile')) {
                event.preventDefault();
            } else {
                displaySinglePostInfo($(this));
            }
        });
        $(this).on('keydown', function(event){
            if (event.keyCode === 32 || event.keyCode === 13) {
                event.preventDefault();
                if (popupContainer.is(':visible')) {
                    closePopupBox();
                } else {
                    displaySinglePostInfo($(this));
                }

            }
        });
    });

    /*=== events to trigger closing popup box ===*/
    popupBoxCloseBtn.on('click', function(){
        closePopupBox();
    });

    popupBoxCloseBtn.on('keydown', function(event){
        if (event.keyCode === 32 || event.keyCode === 13 ) {
            event.preventDefault();
            closePopupBox();
        }
    });

    /*=== clixk anywhere to close popup box ===*/
    popupContainer.on('click', function(e){
        if (!$(e.target).closest(popupBox).length){
            closePopupBox();
        }
    });

    /****************************
    *****************************
    *** CONTACT FORM HANDLING ***
    *****************************
    ****************************/


    /* contact form variables */
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

    /*=== display validation result for each input ===*/
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

    /*=== validation functions for each input ===*/

    var validator = ""; // holds validation result

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

    /*=== clear the form - for reset button ===*/
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

    /*=== another validation and sending on form submit event ===*/
    function handleSubmit(){
        // validate each input on submit - needed if submit button clicked too early
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
    }

    /*=== ajax for contact form ===*/
    function sendThisMessage(){
        var coffeeData = ""; // to contain selected coffees
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
        };

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

    function handleContactForm(){
        /*== trigger inputs validation on change event ==*/
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

        /*=== trigger events for submitting form ===*/
        submitBtn.on('click', function(event){
            event.preventDefault();
            handleSubmit();
        });

        submitBtn.on('keydown', function(event){
            if (event.keyCode === 32 || event.keyCode === 13 ) {
                event.preventDefault();
                handleSubmit();
            }
        });

        // click sending info box to hide it
        sendingInfoBox.on('click', function(){
            $(this).hide().text('').removeClass('error success');
        });

        /*== trigger events for clearing the form ==*/
        resetBtn.on('click', function(event){
            event.preventDefault();
            clearForm();
            sendingInfoBox.hide().text('').removeClass('error success');
        });
        resetBtn.on('keydown', function(event){
            if (event.keyCode === 32 || event.keyCode === 13 ) {
                event.preventDefault();
                clearForm();
                sendingInfoBox.hide().text('').removeClass('error success');
            }
        });
    }

    handleContactForm();

});