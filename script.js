let title = prompt("Введите название проекта", "Веб-приложение");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
let servicePrice1 = prompt("Сколько это будет стоить?", "2000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
let servicePrice2 = prompt("Сколько это будет стоить?", "3000");
let rollback = Math.ceil(Math.random() * 10);
let allServicePrices, fullPrice, servicePercentPrice;

const typeOf = function (variable) {
  console.log(variable, typeof variable);
};

function getAllServicePrices(serv1, serv2) {
  return parseInt(serv1) + parseInt(serv2);
}

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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

typeOf(title);
typeOf(fullPrice);
typeOf(adaptive);
console.log(title);
console.log(screens);
console.log("Сумма всех дополнительных услуг " + allServicePrices + " рублей/долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани");
console.log("Итоговая стоимость за вычетом отката " + servicePercentPrice + " рублей/долларов/гривен/юани");
console.log(getRollbackMessage(fullPrice));
