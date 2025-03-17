export default function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptButton = document.getElementById('acceptCookies');
    const COOKIE_NAME = 'cookies_accepted';
    const COOKIE_DURATION = 30; // 30 дней
    const SHOW_DELAY = 5000; // 5 секунд

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function showCookieNotice() {
        cookieNotice.classList.add('visible');
    }

    function hideCookieNotice() {
        cookieNotice.classList.remove('visible');
    }

    function handleAccept() {
        setCookie(COOKIE_NAME, 'true', COOKIE_DURATION);
        hideCookieNotice();
    }

    // Проверяем при загрузке страницы
    if (!getCookie(COOKIE_NAME)) {
        // Показываем уведомление с задержкой только если куки не приняты
        setTimeout(showCookieNotice, SHOW_DELAY);
    }

    // Добавляем обработчик на кнопку
    if (acceptButton) {
        acceptButton.addEventListener('click', handleAccept);
    }
} 