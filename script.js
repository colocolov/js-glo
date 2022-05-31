let lang = ["ru", "en"];
let week = [
  ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
];

let currentLang = lang.shift();
console.log(currentLang);

if ((currentLang = "ru")) {
  console.log(week.splice(0, 1));
} else {
  console.log(week.splice(-1, 1));
}

currentLang = lang.pop();
console.log(currentLang);

switch (currentLang) {
  case "ru":
    console.log(week.shift(0, 1));
    break;
  case "en":
    console.log(week.splice(-1, 1));
    break;
  default:
    console.log("Выберите язык");
}

/*
 * Task 2
 */

let namePerson = ["Артем", "Виктор", "Александр"];
let currentName = namePerson.pop();
// let currentName = namePerson.indexOf(1);
console.log("Имя: " + currentName);
currentName == "Артем"
  ? console.log("директор")
  : currentName == "Александр"
  ? console.log("преподаватель")
  : console.log("студент");
