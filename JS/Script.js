let center = [55.78435926711707, 37.71102060324103];

function init() {
  //Координаты на карте
  let map = new ymaps.Map("map", {
    center: center,
    zoom: 17,
    controls: ["routePanelControl"],
  });

  let control = map.controls.get("routePanelControl");
  let city = "Москва";

  //получаем локаицю(получили промис)
  let location = ymaps.geolocation.get();

  //обрабатываем промисы
  location.then(function (res) {
    //передаем 0 элемент текста
    let locationText = res.geoObjects.get(0).properties.get("text");
    console.log(locationText);

    //при загрузке выбор места
    control.routePanel.state.set({
      type: "masstransit",
      //можно проставит фолс для фиксированного начального места
      fromEnabled: true,
      from: locationText,
      //from: `Москва, Малая Семёновская 12`,
      toEnabled: true,
      //to: `${city}, Большая Почтовая улица 40`,
    });
    //изменение вов ремя пользования транспорта
    control.routePanel.options.set({
      types: {
        pedestrian: true,
        masstransit: true,
        taxi: true,
      },
    });
  });

  //Работа с элементами на карте
  let placemark = new ymaps.Placemark(
    center,
    {
      //балуны на карте
      balloonContentHeader: "Ваша метка",
      balloonContentBody: "Общежитие Политеха №1",
      balloonContentFooter: "Покич",
    },
    {
      //использовать свою картинку
      iconLayout: "default#image",
      //руть к картинке
      iconImageHref: "https://cdn-icons-png.flaticon.com/512/8065/8065913.png",
      //размер
      iconImageSize: [40, 40],
      //отступ от центра
      iconImageOffset: [-20, -40],
    }
  );

  //Создание собсвенного балуна
  let placemark1 = new ymaps.Placemark(
    center,
    {
      //балуны на карте
      balloonContent: `
      <div class="balloon">
        <div class="balloon-address">Политех</div>
        <div class="balloon-contacts">Hello</div>
        </div>
      `,
    },
    {
      //использовать свою картинку
      iconLayout: "default#image",
      //руть к картинке
      iconImageHref: "https://cdn-icons-png.flaticon.com/512/8065/8065913.png",
      //размер
      iconImageSize: [40, 40],
      //отступ от центра
      iconImageOffset: [-20, -40],
    }
  );

  // map.geoObjects.add(placemark); //добавить элемент на карту
  map.geoObjects.add(placemark);

  //map.controls.remove("geolocationControl"); // удаляем геолокацию
  //map.controls.remove("searchControl"); // удаляем поиск
  //map.controls.remove("trafficControl"); // удаляем контроль трафика
  //map.controls.remove("typeSelector"); // удаляем тип
  //map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  //map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  //map.controls.remove("rulerControl"); // удаляем контрол правил
  //map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
}

ymaps.ready(init);
