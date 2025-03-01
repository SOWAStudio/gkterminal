let modals = {};
let activeModal = null;
let videoType = null;
let videoUrl = null;

export function initModal() {
    createCallbackModal();
    createVideoModal();
    initModalButtons();
    initModalEvents();
}

function initModalEvents() {
    // Обработчик клика по оверлею
    $(document).on('click', '.modal', function(e) {
        if ($(e.target).hasClass('modal')) {
            closeModal($(e.target).attr('id'));
        }
    });

    // Обработчик клавиши Esc
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
    });
}

function createCallbackModal() {
    const modalHtml = `
        <div class="modal" id="callbackModal">
            <div class="modal__container">
                <button class="modal__close" aria-label="Закрыть"></button>
                <div class="modal__title">Мы вам перезвоним!</div>
                <form class="modal__form" id="callbackForm">
                    <div class="feedback__form-field">
                        <input type="text" name="name" placeholder="ФИО*" required>
                    </div>
                    <div class="feedback__form-field">
                        <input type="tel" name="phone" placeholder="Номер телефона*" required>
                    </div>
                    <div class="feedback__form-field">
                        <select name="address" required>
                            <option value="" disabled selected>Выберите адрес*</option>
                            <option value="АО «ГОТХ»">АО «ГОТХ»</option>
                            <option value="ООО «ОЗСК»">ООО «ОЗСК»</option>
                            <option value="ООО «СЗ «Терминал СК»">ООО «СЗ «Терминал СК»</option>
                            <option value="ООО «АН «Терминал»">ООО «АН «Терминал»</option>
                            <option value="ТД «Терминал»">ТД «Терминал»</option>
                        </select>
                    </div>
                    <div class="feedback__form-field">
                        <textarea name="message" placeholder="Ваш вопрос" rows="5"></textarea>
                    </div>
                    <div class="feedback__form-row feedback__form-row--captcha">
                        <div class="g-recaptcha" data-sitekey="your_site_key"></div>
                    </div>
                    <div class="feedback__form-checkbox">
                        <label class="checkbox">
                            <input type="checkbox" required>
                            <span class="checkbox__text">Нажимая на кнопку «Заказать звонок», вы даете согласие на обработку персональных данных</span>
                        </label>
                    </div>
                    <button type="submit" class="button">
                        <span class="button__text-container" data-text="Заказать звонок">
                            <span class="button__text">Заказать звонок</span>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    `;

    $('body').append(modalHtml);
    
    const $modal = $('#callbackModal');
    const $form = $modal.find('form');
    
    $modal.find('.modal__close').on('click', () => {
        closeModal('callbackModal');
    });

    $form.on('submit', handleSubmit);

    modals.callbackModal = $modal[0];
}

function createVideoModal() {
    const modalHtml = `
        <div class="modal modal--video" id="videoModal">
            <div class="modal__container">
                <div class="modal__video-wrapper">
                    <div class="modal__video">
                        <button class="modal__close" data-close-modal></button>
                        <iframe 
                            src="" 
                            frameborder="0" 
                            allowfullscreen
                            allow="autoplay">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(modalHtml);
}

function initModalButtons() {
    // Кнопки обратного звонка
    $('.button-callback, .button-callback-mobile').on('click', function(e) {
        e.preventDefault();
        openModal('callbackModal');
    });

    // Обработчик для кнопки открытия видео
    $('.button-watch-video').on('click', function(e) {
        e.preventDefault();
        openVideoModal('rutube');
    });

    // Обработчик для закрытия модального окна
    $(document).on('click', '[data-close-modal], .modal--video', function(e) {
        if ($(e.target).is('[data-close-modal]') || $(e.target).hasClass('modal--video')) {
            closeVideoModal();
        }
    });
}

function openModal(modalId) {
    const $modal = $(`#${modalId}`);
    if ($modal.length) {
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
        activeModal = modalId;
    }
}

function closeModal(modalId) {
    const $modal = $(`#${modalId}`);
    if ($modal.length) {
        $modal.removeClass('active');
        $('body').css('overflow', '');
        activeModal = null;
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const $form = $(event.target);
    const formData = new FormData($form[0]);
    const data = Object.fromEntries(formData.entries());

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess($form);
        setTimeout(() => {
            closeModal('callbackModal');
            $form[0].reset();
        }, 2000);
    } catch (error) {
        showError($form, error.message);
    }
}

function showSuccess($form) {
    const successMessage = $('<div>', {
        class: 'feedback__success',
        text: 'Спасибо за ваше обращение! Наши специалисты свяжутся с вами в ближайшее время.'
    });
    $form.empty().append(successMessage);
}

function showError($form, message) {
    const errorMessage = $('<div>', {
        class: 'feedback__error',
        text: message || 'Произошла ошибка. Попробуйте позже.'
    });
    errorMessage.insertBefore($form);
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

async function checkServerVideo() {
    try {
        const response = await fetch('./video/sample.mp4', { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

function openVideoModal(type, url) {
    const $modal = $('#videoModal');
    if (!$modal.length) return;

    const $iframe = $modal.find('iframe');
    if ($iframe.length) {
        // Формируем ссылку для встраивания
        const embedUrl = 'https://rutube.ru/play/embed/695393275b836b293da9a8c244ec16de';
        $iframe.attr('src', embedUrl);
    }

    $modal.addClass('active');
    $('body').css('overflow', 'hidden');
}

function closeVideoModal() {
    const $modal = $('#videoModal');
    if (!$modal.length) return;

    const $iframe = $modal.find('iframe');
    if ($iframe.length) {
        $iframe.attr('src', ''); // Очищаем src для остановки видео
    }

    $modal.removeClass('active');
    $('body').css('overflow', '');
} 