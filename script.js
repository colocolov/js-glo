let title = prompt("Введите название проекта", "Веб-приложение");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
let servicePrice1 = prompt("Сколько это будет стоить?", "2000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Введите услугу");
let servicePrice2 = prompt("Сколько это будет стоить?", "3000");
let rollback = Math.ceil(Math.random() * 10);
let fullPrice = parseInt(screenPrice) + parseInt(servicePrice1) + parseInt(servicePrice2);
let servicePercentPrice = fullPrice - (rollback / 100) * fullPrice;

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}

console.log(rollback);
console.log("Адаптив: " + adaptive);
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани");
console.log("Итоговая стоимость за вычетом отката " + servicePercentPrice + " рублей/долларов/гривен/юани");
