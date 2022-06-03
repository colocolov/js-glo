"use strict";

const random = function () {
  let begin = confirm("Угадаешь число?");

  function getNumber() {
    let num = Math.floor(Math.random() * 100);
    let answer;
    console.log(num);

    const isNumber = function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    };

    function confirm() {
      if (answer > num) {
        alert("Загаданное число меньше");
        number();
      } else if (answer < num) {
        alert("Загаданное число больше");
        number();
      } else if (isNumber(answer) === false) {
        alert("Введи число!");
        number();
      }
    }

    function number() {
      answer = prompt("Угадай число от 1 до 100");
      if (answer == null) {
        alert("Игра окончена");
      } else if (Number(answer) === num) {
        alert("Поздравляю, Вы угадали!!!");
      } else if (answer !== num) {
        confirm();
      }
    }
    number();
  }

  if (begin == true) {
    getNumber();
  } else {
    alert("Игра окончена!");
  }
};

random();
