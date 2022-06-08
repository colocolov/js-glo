"use strict";

const getDate = function () {
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

  function dateA() {
    let newdiv = document.createElement("div");

    newdiv.textContent =
      "Сегодня " +
      days[todayIs.getDay()] +
      ", " +
      todayIs.getDate() +
      " " +
      months[todayIs.getMonth()] +
      " " +
      todayIs.getFullYear() +
      " года, " +
      todayIs.getHours() +
      hours() +
      todayIs.getMinutes() +
      " минут " +
      todayIs.getSeconds() +
      " секунд";

    data.appendChild(newdiv);
  }

  function hours() {
    if (todayIs.getHours() == 1 || todayIs.getHours() == 21) {
      return " час ";
    } else if (todayIs.getHours() >= 2 && todayIs.getHours() <= 4) {
      return " часа ";
    } else if (todayIs.getHours() >= 22 && todayIs.getHours() <= 24) {
      return " часа ";
    } else {
      return " часов ";
    }
  }

  function dateB() {
    let newdiv = document.createElement("div");

    newdiv.textContent =
      zero(todayIs.getDay()) +
      "." +
      zero(todayIs.getMonth()) +
      "." +
      todayIs.getFullYear() +
      " - " +
      zero(todayIs.getHours()) +
      ":" +
      zero(todayIs.getMinutes()) +
      ":" +
      zero(todayIs.getSeconds());

    data.appendChild(newdiv);
  }

  function zero(number) {
    return (number = number < 10 ? "0" + number : number);
  }

  dateA();
  dateB();
};

setInterval(getDate, 1000);
// getDate();
