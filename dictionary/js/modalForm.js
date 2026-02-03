let modalForm1 = document.querySelector(".add-word-modal-form"),
  modalForm2 = document.querySelector(".change-word-modal-form"),
  modalForm3 = document.querySelector(".delete-word-modal-form"),
  showModalBtn = document.querySelector("#showModalBtn"), // кнопка открытия мод.окна добавления слова
  closeBtn = document.querySelector(".modal-close"),
  // changeBtn = document.querySelector("#changeBtn"),
  addBtn = document.querySelector(".add-button"), // кнопка добавления слова  в словарь
  newWordInp = document.querySelector(".newWord"),
  translationInp = document.querySelector(".translation"),
  newWordInp2 = document.querySelector(".newWord2"),
  translationInp2 = document.querySelector(".translation2");

// показываем модальную форму ввода нового слова
showModalBtn.addEventListener("click", () => {
  modalForm1.classList.add("modal-active");
});

// скрываем модальную форму ввода нового слова
modalForm1.addEventListener("click", (event) => {
  if (event.target === modalForm1) {
    modalForm1.classList.remove("modal-active");
  }
});

// добавляем новое слово в файл и выводим новое содержимое файла
addBtn.addEventListener("click", () => {
  fileData[newWordInp.value] = translationInp.value;
  modalForm1.classList.remove("modal-active"); // скрываем модальную форму
  saveFileData(fileData);
  newWordInp.value = "";
  translationInp.value = "";
});
