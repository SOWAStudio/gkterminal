import { mapStyle } from '../data/mapStyle';

let mapInstance = null;
let markersMap = new Map();

export async function initMap(locations) {
    const $map = $('#map');
    if (!$map.length) return;

    // Ждем загрузки API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls} = ymaps3;

    // Создаем карту
    mapInstance = new YMap(document.getElementById('map'), {
        location: {
            center: [43.936861, 56.273099], // Центр Нижнего Новгорода
            zoom: 11
        }
    });

    // Добавляем слои с кастомизацией
    mapInstance.addChild(new YMapDefaultSchemeLayer({
        customization: mapStyle
    }));
    mapInstance.addChild(new YMapDefaultFeaturesLayer({
        customization: mapStyle
    }));

    // Добавляем элементы управления
    // map.addChild(new YMapControls({position: 'right'}));

    // Добавляем маркеры на карту
    locations.forEach(location => {
        const markerElement = document.createElement('div');
        markerElement.className = 'map-marker';
        markerElement.setAttribute('data-company', location.id);
        
        // Добавляем класс для большого маркера
        if (location.markerSize === 'big') {
            markerElement.classList.add('map-marker--big');
        }

        let markerContent = `
            <div class="map-marker__logo">
                <img src="${location.logo}" alt="${location.name}">
            </div>
            <div class="map-marker__content">
                <div class="map-marker__address">${location.address}</div>
            </div>
        `;

        markerElement.innerHTML = markerContent;

        // Добавляем обработчик клика на маркер
        markerElement.addEventListener('click', () => {
            const companyId = location.id;
            const tabButton = document.querySelector(`.contacts-tabs__button[data-company="${companyId}"]`);
            if (tabButton) {
                tabButton.click();
            }
        });

        const mapMarker = new YMapMarker(
            {
                coordinates: [location.coordinates[1], location.coordinates[0]],
            },
            markerElement
        );

        mapInstance.addChild(mapMarker);
        markersMap.set(location.id, {
            marker: markerElement, // Сохраняем DOM-элемент напрямую
            coordinates: [location.coordinates[1], location.coordinates[0]]
        });
    });

    return {
        focusOnMarker: (companyId) => {
            const markerData = markersMap.get(companyId);
            if (markerData) {
                // Устанавливаем новый центр и зум
                mapInstance.setLocation({
                    center: markerData.coordinates,
                    zoom: 15, // Увеличиваем зум при фокусе на маркере
                    duration: 500 // Длительность анимации в миллисекундах
                });

                // Добавляем класс активности маркеру
                markersMap.forEach((data, id) => {
                    if (id === companyId) {
                        data.marker.classList.add('active');
                    } else {
                        data.marker.classList.remove('active');
                    }
                });
            }
        },

        resetView: () => {
            // Возвращаем карту к начальному состоянию
            mapInstance.setLocation({
                center: [43.936861, 56.273099],
                zoom: 11,
                duration: 500
            });

            // Убираем активность со всех маркеров
            markersMap.forEach((data) => {
                data.marker.classList.remove('active');
            });
        }
    };
}
