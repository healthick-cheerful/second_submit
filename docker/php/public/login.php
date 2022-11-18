<?php

require_once(__DIR__ . '/../libs/init.php');

header('Content-Type: application/json');

$result_array = [
    "success" => false,
    "server_error" => false
];

if(!empty($_POST['email']) && !empty($_POST['password'])) {
    try {
        $dbh = Db::getHandle();
        $select_sql = 'SELECT * from `users` WHERE `email`=:email LIMIT 1;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue(':email', $_POST['email']);
        $select_sth->execute();
        $user = $select_sth->fetch();
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
    }

    if(!empty($user)) {
        $correct_password = password_verify($_POST['password'], $user['password']);
        if($correct_password) {
           $result_array['success'] = true;
           session_start();
           $_SESSION['login_user_id'] = $user['id'];
        }
    }
    // userが空(emailが存在しない)の場合はそのままで大丈夫
}

$result_json = json_encode($result_array);
echo $result_json;
return;