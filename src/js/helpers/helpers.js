/**
 * Открыть и закрыть контент на странице, быстрый приятный скрипт
 */
export function initHiddenContent() {
    $('.header__nav-link').click(function (e) {
        e.preventDefault(); // Отменяем стандартное поведение ссылки

        const $navItem = $(this).closest('.header__nav-item');
        const $icon = $(this).find('.icon-chevron');
        const $submenu = $navItem.find('.header__submenu');

        // Закрываем другие открытые подменю (если нужно)
        $('.header__nav-item').not($navItem).removeClass('active');
        $('.header__submenu').not($submenu).fadeOut(300); // Используем fadeOut вместо slideUp
        $('.icon-chevron').not($icon).removeClass('icon-chevron--active');

        // Переключаем класс active и анимируем подменю
        $navItem.toggleClass('active');
        $icon.toggleClass('icon-chevron--active');
        $submenu.fadeToggle(300); // Используем fadeToggle вместо slideToggle
    });
}

export function initMobileMenu() {
    $('[data-toggle-mobile-menu-button]').on('click', function() {
        $('html').toggleClass('open-mobile-menu');
        return false;
    });

    // Обработка кликов по заголовкам подменю
    $('.burger-menu__item-title-wrapper').on('click', function() {
        const $item = $(this).closest('.burger-menu__item');
        
        // Закрываем другие открытые подменю
        $('.burger-menu__item').not($item).removeClass('active');
        
        // Переключаем текущее подменю
        $item.toggleClass('active');
    });
}

