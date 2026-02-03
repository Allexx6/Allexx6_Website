<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

   $json = file_get_contents('php://input');    // выделяем из тела запроса json-данные
   $data = json_decode($json);                      // декодируем в обычный php-класс

   if ($data->language == "english") {

      file_put_contents("english_data.json", $json);
      $jsonData = file_get_contents("english_data.json");   // считываем данные из файла
      if (strlen($jsonData) == 0) {
         echo '{"Данных в файле ":"нет"}';
      } else echo $jsonData;
   } else {
      file_put_contents("russian_data.json", $json);
      $jsonData = file_get_contents("russian_data.json");   // считываем данные из файла
      if (strlen($jsonData) == 0) {
         echo '{"Данных в файле ":"нет"}';
      } else echo $jsonData;
   }
}
