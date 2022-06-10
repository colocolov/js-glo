"use strict";

const title = document.getElementsByTagName("h1")[0];
const btnPlus = document.querySelector(".screen-btn");
const percent = document.querySelectorAll(".other-items.percent");
const number = document.querySelectorAll(".other-items.number");

const range = document.querySelector(".rollback > .main-controls__range > [type=range]");
const rangeValue = document.querySelector(".rollback > .main-controls__range > .range-value");

const btnCalc = document.getElementsByClassName("handler_btn")[0];

const totalInput = document.getElementsByClassName("total-input");

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollback: Math.ceil(Math.random() * 10),

  init: function () {
    appData.addTitle();
    btnCalc.addEventListener("click", appData.start);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    // alert("Yes");
    appData.addScreens();
    // appData.asking();
    // appData.getPrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle(appData.title);
    appData.logger();
  },

  addScreens: function () {
    screens.forEach(function (screen) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      console.log(select.value);
      console.log(input.value);
    });
  },

  asking: function () {
    do {
      appData.title = prompt("Введите название проекта", "Веб-приложение").trim();
    } while (appData.isNumber(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
      } while (appData.isNumber(name));

      do {
        price = +prompt("Сколько будет стоить данная работа?").trim();
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      let numb = i + 1;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
      } while (appData.isNumber(name));

      do {
        price = +prompt("Сколько будет стоить услуга №" + numb + "?").trim();
      } while (!appData.isNumber(price));

      appData.services.push({ id: i, name: name, price: price });
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  typeOf: function (variable) {
    console.log(variable, typeof variable);
  },

  getPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }

    for (let price of appData.services) {
      appData.allServicePrices += price.price;
    }
  },

  getFullPrice: function () {
    appData.fullPrice = parseInt(appData.screenPrice) + appData.allServicePrices;
  },

  getTitle: function () {
    let titleNew = appData.title.trim().toLowerCase();
    appData.title = titleNew.charAt(0).toUpperCase() + titleNew.slice(1);
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.rollback / 100) * appData.fullPrice;
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

  logger: function () {
    console.log(appData.title);
    console.log(appData.screens);
    console.log(btnCalc);
    console.log("Сумма всех дополнительных услуг " + appData.allServicePrices + " рублей");
    console.log("Стоимость разработки сайта " + appData.fullPrice + " рублей");
    console.log("Итоговая стоимость за вычетом отката " + appData.servicePercentPrice + " рублей");
    console.log(appData.getRollbackMessage(appData.fullPrice));
    // console.log("---");

    for (let key in appData) {
      // console.log("Ключ: " + key + " Значение: " + appData[key]);
    }
  },
};

appData.init();
