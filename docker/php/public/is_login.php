<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();

$result_array = [
    "login" => false
];

if(isset($_SESSION['login_user_id'])) {
    $result_array["login"] = true;
}

require_once(__DIR__ . '/../libs/fin.php');
