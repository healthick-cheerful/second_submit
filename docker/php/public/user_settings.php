<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "success" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id']) && !empty($_POST['kind']) && !empty($_POST['value'])) {
    $update_sql = 'UPDATE users SET ';
    if($_POST['kind'] === 'name') {
        $update_element = 'name = :value';
    } else if($_POST['kind'] === 'email') {
        $update_element = 'email = :value';
    } else if($_POST['kind'] === 'password') {
        $password_hash = password_hash($_POST['value'], PASSWORD_DEFAULT);
        $update_element = 'password = :value';
    }
    $update_sql .= $update_element . ' WHERE id = :user_id;';
    try {
        $dbh = Db::getHandle();
        $update_sth = $dbh->prepare($update_sql);
        $update_sth->bindValue(':user_id', $_SESSION['login_user_id']);
        if(empty($password_hash)) {
            $value = $_POST['value'];
        } else {
            $value = $password_hash;
        }
        $update_sth->bindValue(':value', $value);
        $update_result = $update_sth->execute();
        if($update_result) {
            $result_array['success'] = true;
        }
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
        echo $e;
    }
}

require_once(__DIR__ . '/../libs/fin.php');