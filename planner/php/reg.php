<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

   // выделяем из тела запроса json-данные
   $json = file_get_contents('php://input');
   // echo $json;
   // декодируем в обычный php-класс
   $data = json_decode($json);

   $file_path = "../data/" . $data->userTel;

   // проверяем на наличие каталога(номера телефона)
   if (file_exists($file_path)) {
      // echo '{"Пользователь":"существует"}';
      $reg_data = file_get_contents($file_path . "/reg_file.json");
      echo $reg_data;
   } else {
      // echo '{"Пользователь":" не существует"}';
      mkdir($file_path);
      $file_path .= "/reg_file.json";
      $creationDate = date("Y-m-d H:i:s");

      $reg_data = '{"userName":"' . $data->userName . '",';
      $reg_data .= '"userTel":"' . $data->userTel . '",';
      $reg_data .= '"creationDate":"' . $creationDate . '"}';

      file_put_contents($file_path, $reg_data);

      // считываем данные из файла
      $regData = file_get_contents($file_path);
      header('Content-Type: application/json');
      echo $regData;   // отправляем считанные данные из файла на клиент
   }
}
