export const initHeader = () => {
    const $header = $('.header');
    let lastScrollTop = 0;

    const handleScroll = () => {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 50) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }

        lastScrollTop = scrollTop;
    };

    $(window).on('scroll', handleScroll);
    // Вызываем обработчик при загрузке страницы
    handleScroll();
}; 