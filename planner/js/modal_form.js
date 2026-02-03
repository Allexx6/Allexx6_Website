"use strict";
// Модальное окно

// Открытие модального окна регистрации
let openModalBtn = document.querySelector(".open-modal");
openModalBtn.onclick = () => {
  overlay.style.display = "block";
};

// Закрытие модального окна регистрации при нажатии на крестик
closeModalCross.onclick = () => {
  isEntered = false;
  overlay.style.display = "none";
};

// Закрытие модального окна регистрации при нажатии в любом месте за пределами модального окна
overlay.onclick = (event) => {
  if (event.target == overlay) {
    isEntered = false;
    overlay.style.display = "none";
  }
};

// Создание маски ввода для input type="tel"
let phoneMask = IMask(userTelInp, {
  mask: "+{7} (000) 000-00-00",
});

// активация кнопки Вход
function inputHandler() {
  if (phoneMask.masked.isComplete && userNameInp.value.length != 0) {
    submitBtn.classList.add("submit_btn--active");
  } else {
    submitBtn.classList.remove("submit_btn--active");
  }
}

//ввод только букв и управляющих клавиш в input
function checkLetter(event) {
  if (
    !event.ctrlKey &&
    !event.metaKey &&
    !/^[0-9a-zа-яё]*$/iu.test(event.key) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight" &&
    event.key !== "Tab"
  ) {
    event.preventDefault();
  }

  inputHandler();
}

// Oтключаем Enter на форме loginForm
loginForm.onkeypress = (e) => {
  if (e.which == 13) e.preventDefault();
};

userNameInp.onkeydown = checkLetter;
userNameInp.onblur = inputHandler;

userTelInp.oninput = inputHandler;
userTelInp.onblur = inputHandler;

// обработчик нажатия кнопки ВХОД
submitBtn.onclick = () => {
  // добавляем в monthInfo имя и тел пользователя
  userName = document.querySelector("#userNameInp").value;
  userTel = document.querySelector("#userTelInp").value;
  monthInfo["userName"] = userName;
  monthInfo["userTel"] = userTel;

  // запрос на существование пользователя
  fetch("php/reg.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, userTel: userTel }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (monthInfo["userName"] == data["userName"]) {
        // console.log("Доступ разрешен!");
        overlay.style.display = "none";
        h4.textContent = "Вход выполнен -> " + userNameInp.value;
        isEntered = true;

        // отключаем кнопку ВХОД
        openModalBtn.classList.add("disabled");

        // разрешаем выбирать месяц
        for (let headerLi of headerLis) {
          headerLi.classList.add("selectable");
        }

        // разрешаем выбирать день
        asideLis = document.querySelectorAll(".aside-ul>li:nth-child(n + 2)");
        for (let asideLi of asideLis) {
          asideLi.classList.add("selectable");
        }

        // явно вызываем события выбора месяца
        headerLis[2].click();
      } else {
        // console.log("Доступ запрещен!");
        overlay.style.display = "none";
        // показываем модальное окно запрета входа
        let overlayTwo = document.querySelector("#overlayTwo");
        overlayTwo.style.display = "block";
      }
    });
  //
};
