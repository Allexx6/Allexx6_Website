<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

   $json = file_get_contents('php://input');    // выделяем из тела запроса json-данные
   $data = json_decode($json);                      // декодируем в обычный php-класс

   if ($data->language == "english") {
      if (file_exists("english_data.json")) {
         $jsonData = file_get_contents("english_data.json");   // считываем данные из файла
         if (strlen($jsonData) == 0) {
            echo '{"Данных в файле ":"нет"}';
         } else echo $jsonData;
      } else echo '{"Файла ":"нет"}';
   }

   if ($data->language == "russian") {
      if (file_exists("russian_data.json")) {
         $jsonData = file_get_contents("russian_data.json");   // считываем данные из файла
         if (strlen($jsonData) == 0) {
            echo '{"Данных в файле ":"нет"}';
         } else echo $jsonData;
      } else echo '{"Файла ":"нет"}';
   }
}
