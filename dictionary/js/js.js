"use strict";
const langBtn = document.querySelector("#langBtn");
const h1 = document.querySelector(".h1");
const regex = /^[a-zа-яё]+$/;
let tBody = document.querySelector(".tbody"),
  main = document.querySelector(".main"),
  changeBtn = document.querySelector("#changeBtn"),
  delBtn = document.querySelector("#delBtn"),
  tabsLetters = document.querySelector(".tabs"),
  footer = document.querySelector("footer");
let selectedTr; // выделенная строка в таблице

// обработчик на нажатие(выбор) строки в таблице
tBody.addEventListener("click", (e) => {
  let target = e.target;
  let tr = target.closest("tr");

  if (target.tagName != "TD") return;

  if (selectedTr) {
    selectedTr.classList.remove("highlight"); // убрать существующую подсветку, если есть
  }
  selectedTr = tr;
  selectedTr.classList.add("highlight"); // подсветить новый td
  showModalBtn.disabled = true;
  changeBtn.disabled = false;
  delBtn.disabled = false;
});

//снятие выделения строки в таблице
main.addEventListener("click", (e) => {
  if (e.target.tagName != "TD") {
    if (selectedTr) selectedTr.classList.remove("highlight"); // убрать существующую подсветку, если есть
    showModalBtn.disabled = false;
    changeBtn.disabled = true;
    delBtn.disabled = true;
  }
});

//обработчик на ввод только букв в input(ы)
footer.addEventListener("keypress", (event) => {
  if (event.target.tagName == "INPUT" && !regex.test(event.key))
    event.preventDefault();
});

// обработчик на нажатие кнопки Русско-Английский-Русский
langBtn.addEventListener("click", (e) => {
  if (langBtn.innerHTML == "Русско-Английский") {
    langBtn.innerHTML = "Англо-Русский";
    h1.innerHTML = "Русско-Английcкий словарик";
    language = "russian";
    createTabs();
    dataRequest();
  } else {
    langBtn.innerHTML = "Русско-Английский";
    h1.innerHTML = "Англо-Русский словарик";
    language = "english";
    createTabs();
    dataRequest();
  }
});

// обработчик нажатия на любую букву алфавита
tabsLetters.addEventListener("click", (event) => {
  let letter = event.target.innerHTML.toLowerCase();
  console.log("Сортируем по букве  ", letter);
  let mas = [];
  let keys = Object.keys(fileData);
  for (let key of keys) {
    if (key.substring(0, 1) == letter) mas.push(key);
  }
  let sortedMassByLetter = mas.sort();
  let newFileData = {};
  sortedMassByLetter.forEach((elem) => {
    newFileData[elem] = fileData[elem];
  });
  showData(newFileData);
  console.log("newFileData = ", newFileData);
});

// создаем панель tabs в зависимости от выбранного языка и заполняем таблицу
createTabs();
dataRequest();

// console.log(" Привет из js.js");
