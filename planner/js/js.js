"use strict";
let i = 0,
  atr, // значение атрибута data-date каждого headerLi
  asideLis, // список дней из aside-ul
  nowDate = new Date(), // дата на сегодня
  iDate, // дата используемая в цикле
  daysInMonth, // кол-во дней в выбранном месяце
  selectedDate, // выбранный год и месяц из header
  selectedDay, // выбранный день из aside
  isEntered = false, // выполнен ли вход
  isMonthInfoChanged = false, // редактировали ли textarea
  year,
  month, // год и месяц из selectedDate
  textAreas, // список всех textArea
  headerLis, // список второго и последующих li в header-ul
  monthInfo = {}, // планируемые мероприятия месяца
  userName, // имя пользователя
  userTel, // телефон пользователя
  isLoginGood = false, // неправильный логин
  tableHeader, // заголовок таблицы над textAreas
  months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  monthsInModal = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
  daysOfWeek = ["(вс)", "(пн)", "(вт)", "(ср)", "(чт)", "(пт)", "(сб)"];

// явно скрываем кнопку saveBtn
let saveBtn = document.querySelector("#saveBtn");
saveBtn.style.display = "none";

// функция закрытия второго модального окна
function closeModalTwo() {
  overlayTwo.style.display = "none";
}

// функция добавления 0 если число месяца < 10
function addZero(month) {
  if (month < 10) return "0" + month;
  else return month;
}

// функция определения количества дней в месяце
function defDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// функция создания левой панели aside
function createAsideLis(days) {
  let li;
  // очищаем панель aside от li
  let asideLis = document.querySelectorAll(".aside-ul>li:nth-child(n + 2)");
  for (let asideLi of asideLis) asideLi.remove();

  // создаем элементы li в aside в зависимости от выбранного месяца
  for (let i = 1; i < days + 1; i++) {
    li = document.createElement("li");
    // получаем день недели и преобразуем
    let year = selectedDate.slice(0, 4);
    let month = selectedDate.slice(5, 7);
    let date = new Date(year, month, i);
    let day = date.getDay();
    if (day == 0 || day == 6) {
      li.style.background = "burlywood";
    }
    li.innerHTML = i + " " + daysOfWeek[day];
    li.setAttribute("data-day", i);
    asideUl.appendChild(li);
  }
}

// функция отрисовывания левой панели aside
function showAsideLis() {
  let li;
  // очищаем панель aside от li
  let asideLis = document.querySelectorAll(".aside-ul>li:nth-child(n + 2)");
  for (let asideLi of asideLis) asideLi.remove();
}

// функция очистки всех textArea
function cleanTextArea() {
  for (let textArea of textAreas) {
    textArea.value = "";
    textArea.style.height = "35px";
  }
}

// функция заполнения объекта monthInfo
function fillMonthInfo() {
  for (let textArea of textAreas) {
    if (textArea.value.length != 0) {
      let key, value, day, hour;
      if (selectedDay < 10) {
        day = addZero(selectedDay);
      } else day = selectedDay;

      if (textArea.dataset.hour < 10) {
        hour = addZero(textArea.dataset.hour);
      } else hour = textArea.dataset.hour;

      key = day + hour;
      value = textArea.value;
      monthInfo[key] = value;

      console.log("monthInfo = ", monthInfo);
    }
  }
}

// функция получения данных сохраненных на сервере за месяц
function getInfo(month, year, userTel) {
  let options = {
    month: month,
    year: year,
    userTel: userTel,
  };

  fetch("php/get_info.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевая ошибка");
      }
      return response.json();
    })
    .then((data) => {
      if (Object.keys(data).length != 1) {
        monthInfo = Object.assign({}, data);
        console.log("Загруженные данные - ", monthInfo);
      } else {
        console.log("Данных за этот месяц нет");
        // очищаем monthInfo
        Object.keys(monthInfo).forEach((key) => {
          if (
            key != "month" &&
            key != "year" &&
            key != "userTel" &&
            key != "userName"
          ) {
            delete monthInfo[key]; // console.log("Удаляем каждое свойсво из monthInfo -", monthInfo);
          }
        });
      }
    })
    .catch((error) => console.error("Ошибка:", error));
}

// функция показа данных полученных с сервера за выбранный день
function showInfo(info) {
  let dataEntries = Object.entries(info);
  if (info.length != 0) {
    dataEntries.forEach((dataEntry) => {
      let key = dataEntry[0];
      if (
        key != "month" &&
        key != "year" &&
        key != "userTel" &&
        key != "userName"
      ) {
        let keyDay = dataEntry[0].slice(0, 2);
        let keyHour = dataEntry[0].slice(2, 4);

        // начинаем вывод данных на страницу
        if (+keyDay == +selectedDay) {
          textAreas[+keyHour].value = dataEntry[1];
        }
        //
      }
    });
  }
}

// функция записи данных за месяц на сервер
function saveInfo(info) {
  fetch("php/save_info.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("Записанные данные = ", data);
    });

  // убираем кнопку Сохранить
  saveBtn.style.display = "none";
  isMonthInfoChanged = false;
}

// определяем переменные year, month, daysInMonth, selectedDay на текущую дату
year = nowDate.getFullYear();
month = nowDate.getMonth();
if (month < 10) month = "0" + month;
daysInMonth = defDaysInMonth(year, +month + 1);
selectedDay = nowDate.getDate();

// Переписываем h5
document.querySelector("#h5").innerHTML =
  "( сегодня " + selectedDay + "." + addZero(+month+1) + "." + year + ")";

// Определяем заголовок таблицы
tableHeader = document.querySelector(".th-plan");

// создаем верхнюю панель с месяцами (header)

// получаем массив li в header-ul
headerLis = document.querySelectorAll(".header-ul>li");

// и присваиваем каждому li  -  innerHTML и data-date
for (let headerLi of headerLis) {
  iDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + i - 2);
  headerLi.innerHTML = months[iDate.getMonth()] + "<br>" + iDate.getFullYear();
  atr = iDate.getFullYear() + "." + addZero(iDate.getMonth());
  headerLi.setAttribute("data-date", atr);
  i++;
}

// создаем левую панель

// первоначально создаем элементы li в aside-ul в зависимости от текущей даты
for (let i = 1; i < daysInMonth + 1; i++) {
  let li;
  li = document.createElement("li");
  let date = new Date(year, month, i); // получаем дату с 1 по конец текущего месяца
  let day = date.getDay(); // получаем день недели
  if (day == 0 || day == 6) {
    li.style.background = "burlywood";
  }
  li.innerHTML = i + " " + daysOfWeek[day];
  li.setAttribute("data-day", i);
  asideUl.appendChild(li);
}

// в зависимости от текущей даты устанавливаем checked для li в header и aside
document.querySelector(".header-ul>li:nth-child(3)").classList.add("checked");
document
  .querySelector(`.aside-ul>li:nth-child(${selectedDay + 1})`)
  .classList.add("checked");

// создаем главную панель с textArea и отрисовываем
for (let i = 0; i < 24; i++) {
  let tr = document.createElement("tr");
  let textArea = document.createElement("textarea");
  let firstTd = document.createElement("td");
  let secondTd = document.createElement("td");
  firstTd.innerHTML = i;
  textArea.setAttribute("data-hour", i);
  textArea.readOnly = true;
  tr.appendChild(firstTd);
  secondTd.appendChild(textArea);
  tr.appendChild(secondTd);
  table.appendChild(tr);
}

// создаем список всех textArea
textAreas = document.querySelectorAll("textarea");

// навешиваем на все textarea обработчики
for (let textArea of textAreas) {
  // обработчик на редактирование текста
  textArea.addEventListener("input", () => {
    if (!isMonthInfoChanged) isMonthInfoChanged = true;
    if (isEntered && isMonthInfoChanged && saveBtn.style.display == "none")
      saveBtn.style.display = "block";

    // если все данные из какого-либо textArea удалили -> удаляем строку из monthInfo
    if (textArea.value.length == 0) {
      let key, value, day, hour;
      if (selectedDay < 10) {
        day = addZero(selectedDay);
      } else day = selectedDay;

      if (textArea.dataset.hour < 10) {
        hour = addZero(textArea.dataset.hour);
      } else hour = textArea.dataset.hour;

      key = day + hour;
      delete monthInfo[key]; // console.log("Строка удалена из monthInfo");
    }
  });

  // обработчик на потерю фокуса в textArea -> запись данных в объект
  textArea.addEventListener("blur", () => {
    if (isMonthInfoChanged) {
      if (textArea.value.length != 0) {
        let key, value, day, hour;
        if (selectedDay < 10) {
          day = addZero(selectedDay);
        } else day = selectedDay;

        if (textArea.dataset.hour < 10) {
          hour = addZero(textArea.dataset.hour);
        } else hour = textArea.dataset.hour;

        key = day + hour;
        value = textArea.value;
        monthInfo[key] = value;
      }
    }
  });
}

// добавляем обработчик на нажатие любого месяц+год в headerLi
for (let headerLi of headerLis) {
  headerLi.addEventListener("click", () => {
    // если не выполнялся вход -> выходим из обработчика нажатия
    if (isEntered == false) return;
    // если редактировались данные - сохраняем
    if (isMonthInfoChanged) saveInfo(monthInfo);

    isMonthInfoChanged = false;
    // запрещаем ввод данных в textArea
    for (let textArea of textAreas) {
      textArea.readOnly = true;
    }

    // убираем со всех headerli класс checked и следом устанавливаем его на нажатый
    for (let headerLi of headerLis) {
      headerLi.classList.remove("checked");
    }
    headerLi.classList.add("checked");

    cleanTextArea(); // очищаем  все textArea

    // устанавливаем выбранную дату (месяц+год)
    selectedDate = headerLi.dataset.date;

    // определяем количество дней в выбранном месяце
    let year = selectedDate.slice(0, 4);
    let month = selectedDate.slice(5, 7);
    daysInMonth = defDaysInMonth(year, +month + 1);

    // добавляем в monthInfo год и месяц
    monthInfo["month"] = month;
    monthInfo["year"] = year;

    // меняем заголовок таблицы в зависимости прошел месяц или нет
    if (+new Date(year, +month + 1) < +new Date()) {
      tableHeader.innerHTML =
        "Запланированные мероприятия на " + months[+month] + " " + year + " г.";
      console.log("месяц прошел");
    } else {
      tableHeader.innerHTML =
        "Планируемые мероприятия на " + months[+month] + " " + year + " г.";
      console.log("месяц не прошел");
    }

    // создаем элементы li в aside
    createAsideLis(daysInMonth);

    // создаем список дней из aside и добавляем каждому атрибут selectable(можно выбирать)
    asideLis = document.querySelectorAll(".aside-ul>li:nth-child(n + 2)");
    for (let asideLi of asideLis) {
      asideLi.classList.add("selectable");
    }

    // загружаем с сервера данные выбранного месяца
    getInfo(month, year, userTel);
    // console.log("monthInfo = ", monthInfo);

    //  устанавливаем обработчик на нажатие дня
    for (let asideLi of asideLis) {
      asideLi.addEventListener("click", () => {
        // если редактировались данные - сохраняем
        if (isMonthInfoChanged) saveInfo(monthInfo);

        // разрешаем вводить в textArea
        for (let textArea of textAreas) {
          textArea.readOnly = false;
        }

        for (let asideLi of asideLis) {
          asideLi.classList.remove("checked");
        }
        asideLi.classList.add("checked");

        // устанавливаем выбранный день
        selectedDay = asideLi.dataset.day;

        // меняем заголовок второй колонки таблицы в зависимости от выбранного дня
        document.querySelector(".th-plan").innerHTML =
          "Планируемые мероприятия на " +
          selectedDay +
          " " +
          monthsInModal[+month] +
          " " +
          year +
          " г.";

        // очищаем все textarea
        for (let textArea of textAreas) {
          textArea.value = "";
        }

        // показываем данные за выбранный день
        // console.log("monthInfo = ", monthInfo);
        showInfo(monthInfo);

        // если выбранный день в прошлом -> запрещаем редактирование

        let date = new Date();
        console.log("Сегодня = ", +date);
        let selDate = new Date(year, month, selectedDay);
        console.log("selDate = ", +selDate);
        if (date > +selDate + 86400000) {
          for (let textArea of textAreas) {
            // textArea.value = "";
            textArea.readOnly = true;
          }
          document.querySelector(".th-plan").innerHTML =
            "Запланированные мероприятия на " +
            selectedDay +
            " " +
            monthsInModal[+month] +
            " " +
            year +
            " г.";
        }
      });
    }
  });
}
