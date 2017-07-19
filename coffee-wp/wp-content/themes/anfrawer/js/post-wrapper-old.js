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

    var bulletsAmount = posts.length;
    console.log(bulletsAmount);

    /* posts amount indicator */

    var singleBullet = $('<span>').addClass('fa').addClass('fa-circle');
    var postIndicator = $('#post-indicator');
    var counter = 0;
    function createPostBullets(){
        var clonedBullet = singleBullet.clone(true);
        clonedBullet.appendTo(postIndicator);
        counter++;
        if (counter < bulletsAmount) {
            createPostBullets();
        }
    }
    createPostBullets();


    function postSlider(){

        var firstPostClone = posts.first().clone(true);
        var lastPostClone = posts.last().clone(true);

        postsList.append(firstPostClone);
        postsList.prepend(lastPostClone);

        var bullets = $('span.fa-circle'); // displaying posts amount
        bullets.eq(currentPostIndex-1).addClass('active');
        bullets.each(function(index, value){
            $(this).attr('data-number', index+1); 
        });

        function animateSlider(){
            bullets.each(function(){
                $(this).removeClass('active');
            });
            bullets.eq(currentPostIndex-1).addClass('active');
            if (currentPostIndex === posts.length+1) {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200, function(){
                    postsList.css('left', (postWidth*-1));
                });
                currentPostIndex = 1;
                bullets.eq(currentPostIndex-1).addClass('active');
            } else if (currentPostIndex === 0) {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200, function(){
                    postsList.css('left', (postWidth*(posts.length))*-1);
                });
                currentPostIndex = posts.length;
                bullets.eq(currentPostIndex-1).addClass('active');
            } else {
                postsList.animate({left: (currentPostIndex*postWidth)*-1}, 1200);
                bullets.eq(currentPostIndex-1).addClass('active');
            }
        }

        function startTheSlider(event) {
            currentPostIndex = currentPostIndex+event.data.value;
            animateSlider();
        }

        nextPostButton.on('click', {value: +1}, startTheSlider);
        prevPostButton.on('click', {value: -1}, startTheSlider);

        bullets.each(function(){
            $(this).on('click', function(){
                currentPostIndex = $(this).data('number');
                animateSlider();
            });
        });

        // animation on swipe: for mobile


        $('.post-wrapper').swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {
                if (direction == 'right') {
                    currentPostIndex--;
                    animateSlider();
                } else if (direction == 'left') {
                    currentPostIndex++;
                    animateSlider();
                }
            }, allowPageScroll:"vertical" // throws warnings, however it works
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