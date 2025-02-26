const isDev = false; // Режим разработки для тестирования

function showSuccess(form) {
    // Очищаем форму
    form.reset();

    // Сбрасываем капчу только если она существует
    if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
    }

    // Показываем сообщение об успехе
    const successMessage = document.createElement('div');
    successMessage.className = 'feedback__success';
    successMessage.textContent = 'Спасибо за ваше обращение! Наши специалисты свяжутся с вами в ближайшее время.';

    form.parentNode.insertBefore(successMessage, form);
    form.style.display = 'none';

    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.remove();
        form.style.display = '';
    }, 5000);
}

function showError(form, message) {
    // Показываем сообщение об ошибке
    const errorMessage = document.createElement('div');
    errorMessage.className = 'feedback__error';
    errorMessage.textContent = message;

    form.parentNode.insertBefore(errorMessage, form);

    // Удаляем сообщение через 3 секунды
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Проверка reCAPTCHA только если не в режиме разработки и капча существует
    if (!isDev && typeof grecaptcha !== 'undefined') {
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showError(form, 'Пожалуйста, подтвердите, что вы не робот');
            return;
        }
        data.recaptchaResponse = recaptchaResponse;
    }

    try {
        if (isDev) {
            // Имитация успешной отправки в режиме разработки
            await new Promise(resolve => setTimeout(resolve, 1000));
            showSuccess(form);
        } else {
            // Реальная отправка на сервер
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке формы');
            }

            showSuccess(form);
        }
    } catch (error) {
        showError(form, error.message);
    }
}

export function initFeedback() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}
