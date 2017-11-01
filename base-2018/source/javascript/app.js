jQuery(document).ready(function($) {
    // toggle navbar with hamburger icon
    $('#navbar-toggle').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('is-active') != true) {
            $(this).addClass('is-active');
            $(this).parents('.navbar').find('.navbar-menu').addClass('is-active');
        } else {
            $(this).removeClass('is-active');
            $(this).parents('.navbar').find('.navbar-menu').removeClass('is-active');
        }
    });
});