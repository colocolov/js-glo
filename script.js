let title = "Разработка вебприложений";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 150;
let rollback = Math.random() * 10;
let fullPrice = 35000;
let adaptive = true;

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей/долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани");
console.log(screens.toLowerCase().split(", "));
console.log("Процент отката посреднику за работу: " + fullPrice * (rollback / 100));
