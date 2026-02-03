let changeWordBtn = document.querySelector(".add-button2");
let oldWord;

// показываем модальную форму исправления слов
changeBtn.addEventListener("click", () => {
  let tdChildren = selectedTr.children;
  modalForm2.classList.add("modal-active");
  newWordInp2.value = tdChildren[0].innerHTML;
  translationInp2.value = tdChildren[1].innerHTML;
  oldWord = tdChildren[0].innerHTML;
});

// скрываем модальную форму исправления слов
modalForm2.addEventListener("click", (event) => {
  if (event.target === modalForm2) {
    modalForm2.classList.remove("modal-active");
  }
});

changeWordBtn.addEventListener("click", () => {
  delete fileData[oldWord];
  fileData[newWordInp2.value] = translationInp2.value;
  modalForm2.classList.remove("modal-active"); // скрываем модальную форму
  saveFileData(fileData);
});
