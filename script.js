"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  service1: "",
  service2: "",
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollback: Math.ceil(Math.random() * 10),

  asking: function () {
    appData.title = prompt("Введите название проекта", "Веб-приложение");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  typeOf: function (variable) {
    console.log(variable, typeof variable);
  },

  getAllServicePrices: function () {
    let sum = 0,
      price,
      numb;

    for (let i = 0; i < 2; i++) {
      numb = i + 1;
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
      }

      do {
        price = prompt("Сколько будет стоить услуга №" + numb + "?").trim();
      } while (!appData.isNumber(price));

      sum += +price;
    }
    return sum;
  },

  getFullPrice: function () {
    return parseInt(appData.screenPrice) + appData.allServicePrices;
  },

  getTitle: function () {
    let titleNew = appData.title.trim().toLowerCase();
    return titleNew.charAt(0).toUpperCase() + titleNew.slice(1);
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - (appData.rollback / 100) * appData.fullPrice;
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle(appData.title);
    appData.logger();
  },

  logger: function () {
    console.log(appData.title);
    console.log(appData.screens);
    console.log("Сумма всех дополнительных услуг " + appData.allServicePrices + " рублей");
    console.log("Стоимость разработки сайта " + appData.fullPrice + " рублей");
    console.log("Откат " + appData.rollback + " рублей");
    console.log("Итоговая стоимость за вычетом отката " + appData.servicePercentPrice + " рублей");
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log("---");

    for (let key in appData) {
      console.log("Ключ: " + key + " Значение: " + appData[key]);
    }
  },
};

appData.start();
