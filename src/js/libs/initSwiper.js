import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay, Manipulation } from 'swiper/modules';

function initCompanyGroupSlider() {
    return new Swiper('.company-group__slider', {
        modules: [Navigation, Pagination, EffectFade],
        speed: 1000,
        loop: true,
        effect: 'fade',
        spaceBetween: 32,
        pagination: {
            el: window.innerWidth < 768 ? '.company-group__slider-nav .swiper-pagination' : '.company-group__slider > .swiper-pagination',
        },
        navigation: {
            nextEl: '.company-group__slider .swiper-button-next',
            prevEl: '.company-group__slider .swiper-button-prev',
        },
        breakpoints: {
            768: {
                pagination: {
                    el: '.company-group__slider > .swiper-pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const bulletIndex = (index + 1).toString().padStart(2, '0');
                        return '<span class="' + className + '">' + bulletIndex + '</span>';
                    },
                },
            },
            479: {
                pagination: {
                    el: '.company-group__slider-nav .swiper-pagination',
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '">' + (this.realIndex + 1).toString().padStart(2, '0') + '</span> / <span class="' + totalClass + '">' + this.slides.length.toString().padStart(2, '0') + '</span>';
                    },
                },
            },
            0: {
                pagination: {
                    el: '.company-group__slider-nav .swiper-pagination',
                    type: 'bullets',
                },
            },
        },
    });
}

function initProductionComplexSlider() {
    return new Swiper('.production-complex__slider', {
        modules: [Navigation, Pagination, EffectFade, Autoplay],
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        breakpoints: {
            0: {
                pagination: {
                    el: '.production-complex .swiper-pagination',
                    type: 'bullets',
                },
            },
            479: {
                pagination: {
                    el: '.production-complex .swiper-pagination',
                    type: 'bullets',
                },
            },
            1199: {
                slidesPerView: 1,
            }
        },
        navigation: {
            nextEl: '.production-complex__slider .swiper-button-next',
            prevEl: '.production-complex__slider .swiper-button-prev',
        },
    });
}

function initProjectCurrentSlider() {
    return new Swiper('.current-project__slider', {
        modules: [Navigation, Pagination, EffectFade, Autoplay],
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        breakpoints: {
            0: {
                pagination: {
                    el: '.current-project .swiper-pagination',
                    type: 'bullets',
                },
            },
            479: {
                pagination: {
                    el: '.current-project .swiper-pagination',
                    type: 'bullets',
                },
            },
            1199: {
                slidesPerView: 1,
            }
        },
        navigation: {
            nextEl: '.current-project__slider .swiper-button-next',
            prevEl: '.current-project__slider .swiper-button-prev',
        },
    });
}

function initCurrentConstructionSlider() {
    return new Swiper('.current-construction__slider', {
        modules: [Navigation, Pagination],
        speed: 1000,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        initialSlide: 1,
        breakpoints: {
            0: {
                spaceBetween: 24,
                pagination: {
                    el: '.current-construction__slider .swiper-pagination.swiper-pagination-tablet',
                    type: 'bullets',
                },
            },
            479: {
                spaceBetween: 24,
                pagination: {
                    el: '.current-construction__slider .swiper-pagination.swiper-pagination-tablet',
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '">' + (this.realIndex + 1).toString().padStart(2, '0') + '</span> / <span class="' + totalClass + '">' + this.slides.length.toString().padStart(2, '0') + '</span>';
                    },
                },
            },
            1024: {
                spaceBetween: 128,
                pagination: {
                    el: '.current-construction__slider .swiper-pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const bulletIndex = (index + 1).toString().padStart(2, '0');
                        return '<span class="' + className + '">' + bulletIndex + '</span>';
                    },
                },
            },
            1440: {
                spaceBetween: 177,
                pagination: {
                    el: '.current-construction__slider .swiper-pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const bulletIndex = (index + 1).toString().padStart(2, '0');
                        return '<span class="' + className + '">' + bulletIndex + '</span>';
                    },
                },
            }
        },
        navigation: {
            nextEl: '.current-construction__slider .swiper-button-next',
            prevEl: '.current-construction__slider .swiper-button-prev',
        },
    });
}

function initLocationSliders() {
    let enterprisesSlider;
    let complexesSlider;

    function initSliders() {
        if (window.innerWidth <= 767) {
            if (!enterprisesSlider) {
                enterprisesSlider = new Swiper('.location__list--enterprises', {
                    modules: [Pagination],
                    speed: 1000,
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 32,
                    pagination: {
                        el: '.location__list--enterprises .swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 24
                        },
                        376: {
                            slidesPerView: 2,
                            spaceBetween: 32
                        }
                    }
                });
            }

            if (!complexesSlider) {
                complexesSlider = new Swiper('.location__list--complexes', {
                    modules: [Pagination],
                    speed: 1000,
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 32,
                    pagination: {
                        el: '.location__list--complexes .swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 24
                        },
                        376: {
                            slidesPerView: 2,
                            spaceBetween: 32
                        }
                    }
                });
            }
        } else {
            if (enterprisesSlider) {
                enterprisesSlider.destroy(true, true);
                enterprisesSlider = null;
            }
            if (complexesSlider) {
                complexesSlider.destroy(true, true);
                complexesSlider = null;
            }
        }
    }

    // Инициализация при загрузке
    initSliders();

    // Обработка ресайза окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initSliders();
        }, 250);
    });

    return {
        enterprisesSlider,
        complexesSlider
    };
}

function initContactsSlider() {
    return new Swiper('.contacts__slider', {
        modules: [Navigation, Pagination],
        speed: 1000,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        initialSlide: 0,
        allowTouchMove: true,
        breakpoints: {
            0: {
                spaceBetween: 24,
                pagination: {
                    el: '.contacts__slider .swiper-pagination.swiper-pagination-tablet',
                    type: 'bullets',
                },
            },
            479: {
                spaceBetween: 24,
                pagination: {
                    el: '.contacts__slider .swiper-pagination.swiper-pagination-tablet',
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '">' + (this.realIndex + 1).toString().padStart(2, '0') + '</span> / <span class="' + totalClass + '">' + this.slides.length.toString().padStart(2, '0') + '</span>';
                    },
                },
            },
            1024: {
                spaceBetween: 128,
                pagination: {
                    el: '.contacts__slider .swiper-pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const bulletIndex = (index + 1).toString().padStart(2, '0');
                        return '<span class="' + className + '">' + bulletIndex + '</span>';
                    },
                },
            },
            1440: {
                spaceBetween: 177,
                pagination: {
                    el: '.contacts__slider .swiper-pagination',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        const bulletIndex = (index + 1).toString().padStart(2, '0');
                        return '<span class="' + className + '">' + bulletIndex + '</span>';
                    },
                },
            }
        },
        navigation: {
            nextEl: '.contacts__slider .swiper-button-next',
            prevEl: '.contacts__slider .swiper-button-prev',
        },
    });
}

export function initSwipers() {
    const companyGroupSlider = initCompanyGroupSlider();
    const productionComplexSlider = initProductionComplexSlider();
    const projectCurrentSlider = initProjectCurrentSlider();
    const currentConstructionSlider = initCurrentConstructionSlider();
    const locationSliders = initLocationSliders();
    const contactsSlider = initContactsSlider();

    return {
        companyGroupSlider,
        productionComplexSlider,
        currentConstructionSlider,
        locationSliders,
        projectCurrentSlider,
        contactsSlider
    };
}
