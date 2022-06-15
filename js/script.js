"use strict";

const title = document.getElementsByTagName("h1")[0];
const btnPlus = document.querySelector(".screen-btn");
const otherServicesPercent = document.querySelectorAll(".other-items.percent");
const otherServicesNumber = document.querySelectorAll(".other-items.number");
const checkCms = document.getElementById("cms-open");
const cmsVar = document.querySelector(".hidden-cms-variants");

const range = document.querySelector(".rollback input");
const rangeValue = document.querySelector(".rollback > .main-controls__range > .range-value");

const btnCalc = document.getElementsByClassName("handler_btn")[0];
const btnReset = document.getElementsByClassName("handler_btn")[1];

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
    btnPlus.addEventListener("click", this.addScreenBlock);
    checkCms.addEventListener("click", this.addCms);
    btnCalc.addEventListener("click", this.start);
    btnReset.addEventListener("click", this.reset);
    this.getRollback();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.getPrices();
    appData.showResult();
    appData.block();
    // appData.logger();
    // console.log(appData);
  },

  reset: function () {
    btnCalc.style.display = "block";
    btnReset.style.display = "none";

    appData.unblock();
    appData.removeScreens();
    appData.removeScreenBlock();
    appData.removeServices();
    appData.clearResult();

    cmsVar.style.display = "none";
    checkCms.checked = false;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.countScreens += +input.value;

      if (select.value == "" || input.value == "") {
        alert("Выберите Тип экрана и введие их кол-во!");
        // console.log("err");
        return;
      } else {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
        });
      }
    });
  },

  removeScreens: function () {
    appData.screens = [];

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.value = "";
      input.value = "";
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  removeScreenBlock: function () {
    // screens = document.querySelectorAll(".screen");
    // console.log(screens);
    // console.log(screens.length);
    // const arrScr = Array.prototype.slice.call(screens);
    // arrScr.splice(1, screens.length);
    // arrScr.remove();
    // console.log(arrScr);
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

  removeServices: function () {
    otherServicesPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.checked = false;
    });

    otherServicesNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.checked = false;
    });
  },

  // усложненное
  addCms: function () {
    const cmsSelect = document.getElementById("cms-select");

    if (checkCms.checked) {
      cmsVar.style.display = "flex";
      cmsSelect.addEventListener("change", function () {
        let selectValue = cmsSelect.options[cmsSelect.selectedIndex].value;

        if (selectValue == "other") {
          const cmsInput = document.querySelector(".hidden-cms-variants > .main-controls__input");
          cmsInput.style.display = "block";
        } else if (selectValue == "50") {
          appData.fullPrice = appData.fullPrice * 1.5;
          fullTotalCount.value = appData.fullPrice;
        }
      });
    } else {
      cmsVar.style.display = "none";
    }
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

  clearResult: function () {
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
  },

  block: function () {
    btnCalc.style.display = "none";
    btnReset.style.display = "block";

    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      input.disabled = true;
    });

    otherServicesPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = true;
    });

    otherServicesNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = true;
    });
  },

  unblock: function () {
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      input.disabled = false;
    });

    otherServicesPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = false;
    });

    otherServicesNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = false;
    });
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
