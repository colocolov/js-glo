let title = prompt("Введите текст");
let num = 10;

const typeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getTitle = function (variable) {
  return variable.trim();
};

const getStr = function (text) {
  if (typeof text === "string") {
    return "Это верный текст!";
  } else {
    return "Вы не ввели текст!";
  }
};

const lengthTitle = function (variable) {
  let text = getTitle(variable);
  if (text.length > 30) {
    console.log(text.substr(-text.length, 30) + "...");
  } else {
    console.log("Слишком короткая строка");
  }
};

typeOf(title);
console.log(getTitle(title));
console.log(getStr(title));
lengthTitle(title);
console.log("--- пример с числом ---");
typeOf(num);
console.log(getStr(num));
