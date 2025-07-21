let contactsSlider;
let isSlideChanging = false;
let mapControls = null;

export function initContacts() {
    const $tabButtons = $('.contacts-tabs__button');
    const $contentBlocks = $('.company-info__content');
    
    function switchTab(companyId, fromSlider = false) {
        if (isSlideChanging && fromSlider) return;
        
        // Обновляем активный таб
        $tabButtons.removeClass('active');
        $tabButtons.filter(`[data-company="${companyId}"]`).addClass('active');
        
        // Обновляем видимый контент
        $contentBlocks.removeClass('active');
        $contentBlocks.filter(`[data-company="${companyId}"]`).addClass('active');
        
        // Обновляем URL с параметром компании
        const url = new URL(window.location);
        url.searchParams.set('company', companyId);
        window.history.pushState({}, '', url);

        // Фокусируем карту на маркере
        if (mapControls) {
            mapControls.focusOnMarker(companyId);
        }

        // Переключаем слайд только если изменение пришло не от слайдера
        if (!fromSlider && contactsSlider) {
            isSlideChanging = true;
            const slideIndex = contactsSlider.slides.findIndex(slide => 
                $(slide).data('company') === companyId
            );
            if (slideIndex !== -1) {
                contactsSlider.slideTo(slideIndex);
            }
            setTimeout(() => {
                isSlideChanging = false;
            }, 100);
        }
    }
    
    // Обработчики кликов по табам
    $tabButtons.on('click', function() {
        const companyId = $(this).data('company');
        switchTab(companyId);
    });
    
    // Проверяем URL при загрузке страницы
    const urlParams = new URLSearchParams(window.location.search);
    const companyFromUrl = urlParams.get('company');
    
    if (companyFromUrl) {
        // Если компания указана в URL, переключаемся на неё
        switchTab(companyFromUrl);
    }

    // Экспортируем функции для установки слайдера и контролов карты
    return {
        setSlider: (slider) => {
            contactsSlider = slider;
            
            // Добавляем обработчик события изменения слайда
            slider.on('slideChange', () => {
                const activeSlide = $(slider.slides[slider.activeIndex]);
                const companyId = activeSlide.data('company');
                if (companyId) {
                    switchTab(companyId, true);
                }
            });
        },
        
        setMapControls: (controls) => {
            mapControls = controls;
            
            // Если есть активная компания, фокусируем на ней карту
            const activeCompany = $tabButtons.filter('.active').data('company');
            if (activeCompany) {
                controls.focusOnMarker(activeCompany);
            }
        }
    };
} 