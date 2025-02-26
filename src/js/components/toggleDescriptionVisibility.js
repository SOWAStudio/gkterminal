export const toggleDescriptionVisibility = () => {
    $('.production-complex__description--hidden').hide();

    $('.production-complex__link').on('click', function() {
        const description = $(this).parent().find('.production-complex__description--hidden');
        const button = $(this);

        if (description.length) {
            description.slideToggle(500, function() {
                if (!description.is(':hidden')) {
                    $('html, body').animate({
                        scrollTop: description.offset().top - 25
                    }, 500);
                    button.addClass('is-active');
                } else {
                    button.removeClass('is-active');
                }
            });
        }
    });
};