"use strict";
// let
let prevCard = document.querySelector(".card"),
  prevCardIdValue = prevCard.getAttribute("id");

let cards = document.querySelectorAll(".card");
console.log("cards =", cards);
for (let card of cards) {
  card.addEventListener("click", () => {
    let focusedCard = card.getAttribute("id");
    if (focusedCard !== prevCardIdValue) {
      // console.log("Нажали на другую карточку");

      let btns = document.querySelectorAll(`#${prevCardIdValue} button`);
      for (let btn of btns) {
        if (!btn.classList.contains("collapsed")) {
          btn.classList.add("collapsed");
        }
        btn.setAttribute("aria-expanded", "false");
      }

      let divs = prevCard.querySelectorAll(".accordion-collapse");
      // console.log("divs = ", divs);
      for (let div of divs) {
        if (div.classList.contains("show")) {
          div.classList.remove("show");
        }
      }

      prevCard = document.querySelector(`#${focusedCard}`);
    } else console.log("Нажали на ту же самую карточку");

    prevCardIdValue = focusedCard;
    console.log("cardId =", focusedCard);
  });
}
// let children = document.getElementById('parent').querySelectorAll('.child-class');
// var attributeNames = document.getElementById("target").getAttributeNames()
//  let val = btn.getAttribute(name);
// elem.classList.toggle('zzz');
// element.classList.contains(class);
