import '../scss/app.scss';
import lozad from 'lozad'
import { initHiddenContent, initMobileMenu } from './helpers/helpers'
import { toggleDescriptionVisibility } from './components/toggleDescriptionVisibility.js';
import { initSwipers } from './libs/swipers';
import { map } from './libs/map';
import { initFeedback } from './components/feedback';
import { initModal } from './components/modal';
import { initHeader } from './components/header';

$(document).ready(function() {
    initSite();
    toggleDescriptionVisibility();

    function initSite() {
        const observer = lozad();
        observer.observe();

        initHiddenContent();
        initMobileMenu();
        initSwipers();
        initFeedback();
        initModal();
        initHeader();

        // Инициализация карты с координатами
        const locations = [
            {
                coordinates: [56.337694, 43.859694], // АО «ГОТХ»
                name: "АО «ГОТХ»",
                address: "ул. Окская Гавань, 1",
                logo: "./img/location/gootx.svg",
                website: "https://example.com"
            },
            {
                coordinates: [56.327694, 43.949694], // ООО «ОЗСК»
                name: "ООО «ОЗСК»",
                address: "ул. Монастырка, 1",
                logo: "./img/location/ozsk.svg"
            },
            {
                coordinates: [56.287694, 43.939694], // ООО «СЗ «Терминал СК»
                name: "ООО «СЗ «Терминал СК»",
                address: "проспект Ленина, 100В",
                logo: "./img/location/terminal.svg"
            },
            {
                coordinates: [56.247694, 43.929694], // ООО «АН «Терминал»
                name: "ООО «АН «Терминал»",
                address: "ул. Героя Шнитникова, 1; Бурнаковская улица, 99",
                logo: "./img/location/an_terminal.svg",
                website: "https://example.com"
            },
            {
                coordinates: [56.327694, 43.949694], // ТД «Терминал»
                name: "ТД «Терминал»",
                address: "ул. Монастырка, 1",
                logo: "./img/location/terminal.svg",
                website: "https://example.com"
            },
            // Жилые комплексы
            {
                coordinates: [56.337694, 43.919694], // ЖК «ИЮЛЬ»
                name: "ЖК «ИЮЛЬ»",
                address: "ул. Бурнаковская, д. 99",
                logo: "./img/location/iul.svg",
                website: "https://example.com"
            },
            {
                coordinates: [56.247694, 43.929694], // ЖК «Торпедо»
                name: "ЖК «Торпедо»",
                address: "ул. Героя Шнитникова, д.1",
                logo: "./img/location/torpedo.svg"
            }
        ];

        map(locations);
    }
});
