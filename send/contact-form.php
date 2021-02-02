<?php
 if ( !empty($_POST) && trim($_POST['name']) != '' && trim($_POST['email']) != '' && trim($_POST['message']) != '' && empty($_POST['antispam']) ) {
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

/* Задаем переменные */
$name = clean($_POST["name"]);
$email = clean($_POST["email"]);
$message = clean($_POST["message"]);
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $msg = "ok";
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";                                          
    $mail->SMTPAuth   = true;
    // Настройки вашей почты
    $mail->Host       = 'ssl://smtp.yandex.ru'; // SMTP сервера GMAIL
    $mail->Username   = 'example@yandex.ru'; // Логин на почте
    $mail->Password   = 'example'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('example@yandex.ru', 'Название сайта'); // Адрес самой почты и имя отправителя
    // Получатель письма
    $mail->addAddress('example@yandex.ru');  
    // Прикрипление файлов к письму
        // -----------------------
        // Само письмо
        // -----------------------
        $mail->isHTML(true);
    
        $mail->Subject = 'Новое сообщение';
        $mail->Body    = '
        <html>
        <body>
         <p style = "margin: 0; padding:8px; padding-left: 24px;border-radius: 10px 10px 0 0; font-family: sans-serif; font-size:29px; color:white; background-color:#ff9900">Оставлено новое сообщение на сайте</p>
            <p style = "margin: 0; padding: 15px 5px 0 24px; font-family: sans-serif; font-size: 18px; color:white; background-color: #e69138;">Имя пользователя: ' . $name . '</p>
            <p style = "margin: 0; padding: 0 5px 5px 24px; font-family: sans-serif; font-size: 18px; padding-bottom: 15px; color:white; background-color: #e69138;">Электронный адрес пользователя: ' . $email .'</p>
            <p style = "margin: 0; padding: 5px; padding-left: 24px; border-radius: 0 0 10px 10px; font-family: sans-serif; font-size: 18px; color:white; background-color: #e69138;">Текст сообщения: ' . $message .'</p>
        </body>
        
        </html>
        ';
// Проверяем отравленность сообщения
if ($mail->send()) {
    header('location: thankyou.html');
} else {
    header('location: sending-fail.html');
}
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

 } //  моя проверка закрылась

