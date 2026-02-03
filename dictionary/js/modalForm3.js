let newWordInp3 = document.querySelector(".newWord3"),
  translationInp3 = document.querySelector(".translation3"),
  deleteBtn = document.querySelector(".delete-button"),
  cancelBtn = document.querySelector(".cancel-button");

// показываем модальную форму удаления слова
delBtn.addEventListener("click", () => {
  modalForm3.classList.add("modal-active");
  let tdChildren = selectedTr.children;
  newWordInp3.value = tdChildren[0].innerHTML;
  translationInp3.value = tdChildren[1].innerHTML;
});

// скрываем модальную форму удаления слов
modalForm3.addEventListener("click", (event) => {
  if (event.target === modalForm3 || event.target === cancelBtn) {
    modalForm3.classList.remove("modal-active");
  }
});

// удаляем слово из fileData
deleteBtn.addEventListener("click", () => {
  delete fileData[newWordInp3.value];
  modalForm3.classList.remove("modal-active"); // скрываем модальную форму
  saveFileData(fileData);
});
