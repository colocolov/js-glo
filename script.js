"use strict";

const data = document.getElementById("week");
const todayIs = new Date();
let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
let months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
// new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);

const dayOfWeek = {
  isWeekend: function () {
    let newdiv = document.createElement("div");
    // week.forEach(function (item, i) {

    // if (i == todayIs.getDay() - 1) {
    //   newdiv.classList.add("strong");
    //   newdiv.textContent = week[i];
    // }
    // if (item == "Saturday" || item == "Sunday") {
    //   newdiv.classList.add("italic");
    newdiv.textContent =
      "Сегодня " +
      days[todayIs.getDay()] +
      ", " +
      todayIs.getMonth() +
      " " +
      months[todayIs.getMonth()] +
      " " +
      todayIs.getFullYear() +
      " года ";
    // } else {
    //   newdiv.textContent = week[i];
    // }
    // });
    data.appendChild(newdiv);
  },
};
dayOfWeek.isWeekend();
