(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('position-fixed bg-dark shadow-sm');
        } else {
            $('.navbar').removeClass('position-fixed bg-dark shadow-sm');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    // Collapse toggle text & icon update (exclude navbar)
    $('.collapse:not(#navbarCollapse)').on('show.bs.collapse', function () {
        var btn = $('[data-bs-target="#' + $(this).attr('id') + '"]');
        btn.html('Read Less <i class="fa fa-arrow-up ms-1"></i>');
    }).on('hide.bs.collapse', function () {
        var btn = $('[data-bs-target="#' + $(this).attr('id') + '"]');
        btn.html('Read More <i class="fa fa-arrow-right ms-1"></i>');
    });

    // Close mobile navbar when a nav link is clicked
    $('.navbar-nav .nav-link').on('click', function () {
        var navbarCollapse = $('#navbarCollapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.collapse('hide');
        }
    });

})(jQuery);

