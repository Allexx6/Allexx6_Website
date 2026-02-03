// функция создания табов в зависимости от выбранного языка
function createTabs() {
  // удаляем созданные уже li в tabs-items
  let lis = document.querySelectorAll(".liItem");
  for (let li of lis) li.remove();

  // в зависимости от языка создаем новые li в tabs-items
  if (language == "english") {
    for (let letter of englishAlphabet) {
      let li = document.createElement("li");
      li.classList.add("liItem");
      li.innerHTML = letter;
      tabsItems.append(li);
    }
  } else {
    for (let letter of russianAlphabet) {
      let li = document.createElement("li");
      li.classList.add("liItem");
      li.innerHTML = letter;
      tabsItems.append(li);
    }
  }
}

// функция показа данных загруженных из файла
function showData(obj) {
  let tbody = document.querySelector(".tbody"); // тело таблицы
  // console.log("obj = ", obj);
  // удаляем предыдущую таблицу
  let trs = document.querySelectorAll(".tbody tr");
  for (let tr of trs) tr.remove();

  // создаем и выводим на экран новую таблицу
  Object.keys(obj).forEach(function (key) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = key;
    tr.append(td1);
    let td2 = document.createElement("td");
    td2.innerHTML = obj[key];
    tr.append(td2);
    tbody.append(tr);
  });
}

// fetch запрос на загрузку данных из файла и их показ
async function fetchRequestData(body) {
  await fetch("../php/get_data.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевая ошибка");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Загруженные данные - ", data);

      // очищаем fileData
      fileData = {};

      // сохраняем данные в fileData
      Object.keys(data).forEach((key) => {
        // console.log("key = ", key);
        if (key !== "language") fileData[key] = data[key];
      });

      // console.log("fileData = ", fileData);
      showData(fileData);
    })
    .catch((error) => console.error("Ошибка:", error));
}

// функция запроса данных из файла
function dataRequest() {
  if (language == "english") {
    let body = JSON.stringify({ language: "english" });
    fetchRequestData(body);
  } else {
    let body = JSON.stringify({ language: "russian" });
    fetchRequestData(body);
  }
}

// функция записи fileData в файл и показа что записано в файле
function saveFileData(data) {
  data.language = language; // добавляем свойство language в fileData
  body = JSON.stringify(data);

  fetch("../php/save_data.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сетевая ошибка");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Загруженные данные - ", data);

      // прежде чем вывести данные из файла очищаем fileData
      fileData = {};

      // сохраняем данные в fileData
      Object.keys(data).forEach(function (key) {
        if (key !== "language") fileData[key] = data[key];
      });

      showData(fileData);
    })
    .catch((error) => console.error("Ошибка:", error));
}
