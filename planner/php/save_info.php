<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

   // выделяем из тела запроса json-данные
   $json = file_get_contents('php://input');
   $data = json_decode($json);   // декодируем в обычный php-класс


   // создаем путь к файлу
   $file_path = "../data/" . $data->userTel . "/" . $data->year;
   // если нет в каталоге телефона каталога "месяц" -> создаем каталог
   if (!file_exists($file_path)) {
      mkdir($file_path);
   }
   // записываем данные в файл   
   $file_path = $file_path . "/" . $data->month . ".json";
   // выделяем из класса выбранный месяц и создаем(перезаписываем) файл
   file_put_contents($file_path, $json);
   // считываем данные из файла
   $jsonData = file_get_contents($file_path);
   // отправляем считанные данные из файла на клиент
   header('Content-Type: application/json');
   echo $jsonData;
}
