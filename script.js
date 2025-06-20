"use strict";

// const gridItemEls = document.querySelectorAll(".grid-item");
// const btnEls = document.querySelectorAll(".btn");

// let paramLang = [".html", ".js"];
// let paramDiff = [".newbie", ".junior", ".intermediate"];

// for (let i = 0; i < btnEls.length; i++) {
//   btnEls[i].addEventListener("click", function () {
//     btnEls[i].classList.toggle("active");
//     if (i === 0) {
//       changeParam(".html", paramLang);
//     } else if (i === 1) {
//       changeParam(".js", paramLang);
//     } else if (i === 2) {
//       changeParam(".newbie", paramDiff);
//     } else if (i === 3) {
//       changeParam(".junior", paramDiff);
//     } else if (i == 4) {
//       changeParam(".intermediate", paramDiff);
//     }
//     filterGridItems([paramLang, paramDiff]);
//   });
// }

// function changeParam(p, arr) {
//   const index = arr.indexOf(p);
//   if (index !== -1) {
//     arr.splice(index, 1);
//   } else {
//     arr.push(p);
//   }
// }

// function filterGridItems(param) {
//   // let toDisplay = [];
//   // for (let i = 0; i < param[0].length; i++) {
//   //   toDisplay = Array.from(gridItemEls).filter((el) =>
//   //     el.querySelector(param[0][i])
//   //   );
//   // }
//   // for (let i = 0; i < param[1].length; i++) {
//   //   toDisplay = toDisplay.filter((el) => el.querySelector(param[1][0]));
//   // }
//   // console.log(toDisplay);
//   // for (let i = 0; i < gridItemEls.length; i++) {
//   //   gridItemEls[i].style.display = "none";
//   // }
//   // for (let i = 0; i < toDisplay.length; i++) {
//   //   toDisplay[i].style.display = "block";
//   // }
// }
