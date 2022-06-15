"use strict";

const title = document.getElementsByTagName("h1")[0];
const btnPlus = document.querySelector(".screen-btn");
const otherServicesPercent = document.querySelectorAll(".other-items.percent");
const otherServicesNumber = document.querySelectorAll(".other-items.number");

const range = document.querySelector(".rollback input");
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
  screenPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  rollback: 0,
  countScreens: 0,
  servicePercentPrice: 0,

  adaptive: true,

  init: function () {
    this.addTitle();
    btnCalc.addEventListener("click", this.start);
    btnPlus.addEventListener("click", this.addScreenBlock);
    this.getRollback();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.getPrices();
    this.showResult();
    // appData.logger();
    // console.log(appData);
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.countScreens += +input.value;

      if (select.value == "" || input.value == "") {
        alert("Выберите Тип экрана и введие их кол-во!");
        // console.log("err");
        return;
      } else {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
        });
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addServices: function () {
    otherServicesPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherServicesNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  getPrices: function () {
    appData.screenPrice = appData.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    for (let price in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[price];
    }

    for (let price in appData.servicesPercent) {
      appData.servicePricesPercent += (appData.servicesPercent[price] / 100) * appData.screenPrice;
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
    appData.servicePercentPrice = appData.fullPrice - (appData.rollback / 100) * appData.fullPrice;
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.countScreens;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  getRollback: function () {
    // СТРЕЛКА ??
    range.addEventListener("input", function () {
      rangeValue.textContent = range.value + "%";
      appData.rollback = range.value;
      appData.servicePercentPrice = appData.fullPrice - (appData.rollback / 100) * appData.fullPrice;
      totalCountRollback.value = appData.servicePercentPrice;
    });
  },

  logger: function () {
    console.log(appData.title);
    console.log(appData.screens);
    console.log(btnCalc);
    console.log("Итоговая стоимость за вычетом отката " + appData.servicePercentPrice + " рублей");
    console.log("Сумма всех дополнительных услуг " + appData.allServicePrices + " рублей");
    console.log("Стоимость разработки сайта " + appData.fullPrice + " рублей");
    console.log(appData.getRollbackMessage(appData.fullPrice));
  },
};

appData.init();
