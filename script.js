"use strict";

const week = ["Monday", "Tuesday ", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const days = document.getElementById("week");
const todayIs = new Date();

const dayOfWeek = {
  isWeekend: function () {
    week.forEach(function (item, i) {
      let newdiv = document.createElement("div");

      if (i == todayIs.getDay() - 1) {
        newdiv.classList.add("strong");
        newdiv.textContent = week[i];
      }
      if (item == "Saturday" || item == "Sunday") {
        newdiv.classList.add("italic");
        newdiv.textContent = week[i];
      } else {
        newdiv.textContent = week[i];
      }
      days.appendChild(newdiv);
    });
  },
};
dayOfWeek.isWeekend();
