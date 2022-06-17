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
  cmsWordpress: false,
  adaptive: true,

  init: function () {
    this.addTitle();
    btnPlus.addEventListener("click", this.addScreenBlock);
    checkCms.addEventListener("click", () => {
      this.addCms();
    });
    btnCalc.addEventListener("click", () => {
      this.start();
    });
    btnReset.addEventListener("click", () => {
      this.reset();
    });
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
    this.block();
  },

  reset: function () {
    btnCalc.style.display = "block";
    btnReset.style.display = "none";

    this.unblock();
    this.removeScreenBlock();
    this.removeServices();
    this.clearResult();

    cmsVar.style.display = "none";
    checkCms.checked = false;
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

  removeScreenBlock: function () {
    this.screens = [];
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.value = "";
      input.value = "";
    });

    while (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens = document.querySelectorAll(".screen");
    }
  },

  addServices: function () {
    otherServicesPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherServicesNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
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
      const cmsInput = document.querySelector(".hidden-cms-variants > .main-controls__input");
      cmsVar.style.display = "flex";

      cmsSelect.addEventListener("change", () => {
        let selectValue = cmsSelect.options[cmsSelect.selectedIndex].value;

        if (selectValue == "other") {
          cmsInput.style.display = "block";
        } else if (selectValue == "50") {
          cmsInput.style.display = "none";
          this.cmsWordpress = true;
        } else {
          cmsInput.style.display = "none";
        }
      });
    } else {
      cmsVar.style.display = "none";
    }
  },

  getPrices: function () {
    this.screenPrice = this.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    for (let price in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[price];
    }

    for (let price in this.servicesPercent) {
      this.servicePricesPercent += (this.servicesPercent[price] / 100) * this.screenPrice;
    }

    this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
    if (this.cmsWordpress == true) {
      this.fullPrice = this.fullPrice * 1.5;
    }
    this.servicePercentPrice = this.fullPrice - (this.rollback / 100) * this.fullPrice;
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.countScreens;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
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
    range.addEventListener("input", () => {
      rangeValue.textContent = range.value + "%";
      this.rollback = range.value;
      this.servicePercentPrice = this.fullPrice - (this.rollback / 100) * this.fullPrice;
      totalCountRollback.value = this.servicePercentPrice;
    });
  },
};

appData.init();
