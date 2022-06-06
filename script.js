"use strict";

let title, screens, screenPrice, adaptive;
let rollback = Math.ceil(Math.random() * 10);

let service1, service2;
let allServicePrices, fullPrice, servicePercentPrice;

const typeOf = function (variable) {
  console.log(variable, typeof variable);
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Введите название проекта", "Веб-приложение");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0,
    price,
    numb;

  for (let i = 0; i < 2; i++) {
    numb = i + 1;
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
    }

    do {
      price = prompt("Сколько будет стоить услуга №" + numb + "?").trim();
    } while (!isNumber(price));

    sum += +price;
  }
  return sum;
};

const getFullPrice = function () {
  return parseInt(screenPrice) + allServicePrices;
};

function getTitle() {
  let titleNew = title.trim().toLowerCase();
  return titleNew.charAt(0).toUpperCase() + titleNew.slice(1);
}

function getServicePercentPrices() {
  return fullPrice - (rollback / 100) * fullPrice;
}

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle(title);

typeOf(title);
typeOf(fullPrice);
typeOf(adaptive);
console.log(title);
console.log(screens);
console.log("Сумма всех дополнительных услуг " + allServicePrices + " рублей/долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани");
console.log("Итоговая стоимость за вычетом отката " + servicePercentPrice + " рублей/долларов/гривен/юани");
console.log(getRollbackMessage(fullPrice));
