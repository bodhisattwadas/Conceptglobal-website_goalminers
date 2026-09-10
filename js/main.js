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

    // ── Contact Form AJAX Submission ─────────────────────────────────────────
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var $form    = $(this);
        var $btn     = $('#sendBtn');
        var $alert   = $('#formAlert');

        // Hide previous alert
        $alert.hide().html('');

        // Button loading state
        $btn.prop('disabled', true).text('Sending...');

        $.ajax({
            url  : 'contact.php',
            type : 'POST',
            data : $form.serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    $alert
                        .html('<div class="alert alert-success mb-0"><i class="fa fa-check-circle me-2"></i>' + res.message + '</div>')
                        .show();
                    $form[0].reset();
                } else {
                    $alert
                        .html('<div class="alert alert-danger mb-0"><i class="fa fa-exclamation-circle me-2"></i>' + res.message + '</div>')
                        .show();
                }
            },
            error: function () {
                $alert
                    .html('<div class="alert alert-danger mb-0"><i class="fa fa-exclamation-circle me-2"></i>Something went wrong. Please try again or email us at <a href="mailto:info@goalminers.com">info@goalminers.com</a>.</div>')
                    .show();
            },
            complete: function () {
                $btn.prop('disabled', false).text('Send Message');
            }
        });
    });

})(jQuery);

