"use strict";

function one(x) {
  function two() {
    const a = +prompt("Угадай число от 1 до 100");
    // x--;
    // console.log(typeof a, a);
    // console.log(x);

    if (a > x) {
      alert("Загаданное число меньше");
      two();
    } else if (a < x) {
      alert("Загаданное число больше");
      two();
    } else {
      alert("Поздравляю, Вы угадали!!!");
    }
  }
  console.log("--" + x);
  if (x < 101) {
    two();
  } else {
    alert("Ddtlbnt число от 0 до 100");
  }
}

one(10);
