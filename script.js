"use strict";

const body = document.body;
const books = document.querySelector(".books");
const book = document.querySelectorAll(".book");
const head = document.querySelectorAll("a");
const adv = document.querySelector(".adv");

// 1
books.append(book[1]);
books.append(book[0]);
books.append(book[4]);
books.append(book[3]);
books.append(book[5]);
books.append(book[2]);

// 2
body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";

//3
head[4].innerHTML = "Книга 3. this и Прототипы Объектов";

// 4
adv.remove();

// 5
let list2 = book[0].querySelectorAll("li");
list2[3].after(list2[6]);
list2[6].after(list2[8]);
list2[9].after(list2[2]);

let list5 = book[5].querySelectorAll("li");
list5[1].after(list5[9]);
list5[9].after(list5[3]);
list5[3].after(list5[4]);
list5[7].after(list5[5]);

//6
book[2].append("---");
let list6 = book[2].querySelectorAll("li");
// list.before(list[6]);
// console.log(list);
