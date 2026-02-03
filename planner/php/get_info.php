<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {


   $json = file_get_contents('php://input');    // выделяем из тела запроса json-данные
   $data = json_decode($json);                      // декодируем в обычный php-класс

   // если нет такого номера телефона  ->  создаем каталог
   // создаем путь к файлу
   $file_path = "../data/" . $data->userTel . "/" . $data->year . "/" . $data->month . ".json";


   if (file_exists($file_path)) {
      echo $jsonData = file_get_contents($file_path);   // считываем данные из файла
   } else echo '{"Данных":"нет"}';
}
