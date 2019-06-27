<?php
  $SITE_TITLE = 'Я.Корона';

  if ( isset($_POST) ) {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';

    $to = 'Elena357910@yandex.com';
    $no_reply = 'no-reply@silk-its.com';

    $headers = "From: $SITE_TITLE \r\n";
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Reply-To: $email ? $email : $no_reply \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    $data = '<h1>'.$subject."</h1>";
    if ($name) {
      $data .= 'Имя: '.$name."<br>";
    }
    if ($email) {
      $data .= 'Email: '.$email."<br>";
    }
    if ($phone) {
      $data .= 'Телефон: '.$phone."<br>";
    }

    $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
        ".$data."
        <br>\n
        <hr>\n
        <br>\n
        <small>это сообщение было отправлено с сайта ".$SITE_TITLE.", отвечать на него не надо</small>\n</div>";
    $send = mail($to, $subject, $message, $headers);

    if ( $send ) {
      echo '';
    } else {
      echo '<div class="error">Ошибка отправки формы</div>';
    }

  }
  else {
    echo '<div class="error">Ошибка, данные формы не переданы.</div>';
  }
  die();