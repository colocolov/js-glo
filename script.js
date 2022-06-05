"use strict";

const random = function () {
  let begin = confirm("Угадаешь число?");

  function getNumber() {
    let num = Math.floor(Math.random() * 100);
    let answer;
    let attempt = 3;
    console.log(num);

    const isNumber = function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    };

    function confirm() {
      if (answer > num) {
        alert("Загаданное число меньше, осталось попыток " + attempt);
        number();
      } else if (answer < num) {
        alert("Загаданное число больше, осталось попыток " + attempt);
        number();
      } else if (isNumber(answer) === false) {
        alert("Введи число!");
        number();
      }
    }

    function number() {
      let message;
      answer = prompt("Угадай число от 1 до 100");
      attempt--;
      console.log(typeof attempt, attempt);

      if (attempt == 0) {
        message = confirm("Попытки закончились, хотите сыграть еще?");

        if (message === true) {
          getNumber();
          // console.log("****");
        } else {
          alert("Игра окончена!");
        }
      } else {
        if (answer == null) {
          alert("Игра окончена");
        } else if (Number(answer) === num) {
          alert("Поздравляю, Вы угадали!!!");
        } else if (answer !== num) {
          confirm();
        }
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
