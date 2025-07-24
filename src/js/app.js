import '../scss/app.scss';
import lozad from 'lozad'
import { initHiddenContent, initMobileMenu } from './helpers/helpers'
import { toggleDescriptionVisibility } from './components/toggleDescriptionVisibility.js';
import { initSwipers } from './libs/initSwiper';
import { initMap } from './libs/initMap';
import { initFeedback } from './components/feedback';
import { initModal } from './components/modal';
import { initHeader } from './components/header';
import { initContacts } from './components/contacts';
import { initAbout } from './components/about';
import { locations } from './data/locations';
import initCookieNotice from './modules/cookie-notice';

$(document).ready(function() {
    initSite();
    toggleDescriptionVisibility();

    function initSite() {
        const observer = lozad();
        observer.observe();

        initHiddenContent();
        initMobileMenu();

        // Инициализируем контакты и получаем методы управления
        const contactsController = initContacts();

        // Инициализируем слайдеры и карту
        const sliders = initSwipers();

        // Инициализация карты и контактов
        initMapAndContacts();

        initFeedback();
        initModal();
        initHeader();
        initAbout();
        initCookieNotice();
    }

    // Инициализация карты и контактов
    async function initMapAndContacts() {
        const isContactsPage = document.querySelector('.section--contacts');
        const mapControls = await initMap(locations);

        if (isContactsPage) {
            const contacts = initContacts();
            if (mapControls) {
                contacts.setMapControls(mapControls);
            }
        }
    }
});
