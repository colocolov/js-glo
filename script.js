let userNumber;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const getNumber = function () {
  do {
    userNumber = prompt("Введите число");
    if (userNumber === null) {
      continue;
    }
    userNumber.trim();
  } while (!isNumber(userNumber));

  return userNumber.trim();
};

console.log(getNumber());

/*
 *
 */
let arr = [22, 44, 45, 52, 36, 586, 241];

arr.forEach((item) => {
  item = item + "";
  if (item.charAt(0) == 2 || item.charAt(0) == 4) {
    console.log(item);
  }
});

/**
 *
 */
for (let i = 2; i < 101; i++) {
  let num = 1;
  for (let j = 2; j <= i / 2 && num == 1; j++) {
    if (i % j == 0) {
      num = 0;
    }
  }
  if (num == 1) {
    console.log(i);
  }
}
