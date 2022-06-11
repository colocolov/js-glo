"use strict";

const title = document.getElementsByTagName("h1")[0];
const btnPlus = document.querySelector(".screen-btn");
const otherServicesPercent = document.querySelectorAll(".other-items.percent");
const otherServicesNumber = document.querySelectorAll(".other-items.number");

const range = document.querySelector(".rollback > .main-controls__range > [type=range]");
const rangeValue = document.querySelector(".rollback > .main-controls__range > .range-value");

const btnCalc = document.getElementsByClassName("handler_btn")[0];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,

  screenPrice: 0,
  adaptive: true,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollback: Math.ceil(Math.random() * 10),

  init: function () {
    appData.addTitle();
    btnCalc.addEventListener("click", appData.start);
    btnPlus.addEventListener("click", appData.addScreenBlock);
    range.addEventListener("click", this.getRollback());
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  typeOf: function (variable) {
    console.log(variable, typeof variable);
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.getPrices();
    // appData.getServicePercentPrices();
    // appData.logger();
    appData.showResult();
    console.log(appData);
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      // while (+input.value <= 0) {
      //   alert("Введите кол-во экранов!");
      //   break;
      //   //   continue;
      // }
      // else {
      // console.log(">" + input.value);
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });

      // console.log(typeof input);
    });

    for (let price of appData.screens) {
      // appData.servicePricesNumber += appData.servicesNumber[price];
      // console.log("--");
      // console.log(price.price);
      // console.log("**");
    }
    // console.log(appData.screens);
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addServices: function () {
    otherServicesPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherServicesNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  getPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }

    for (let price in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[price];
    }

    for (let price in appData.servicesPercent) {
      appData.servicePricesPercent += (appData.servicesPercent[price] / 100) * appData.screenPrice;
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.rollback / 100) * appData.fullPrice;
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
  },

  getRollback: function () {
    rangeValue.textContent = range.value + " %";
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
