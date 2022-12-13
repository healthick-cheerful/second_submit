<?php

require_once(__DIR__ . '/../libs/init.php');
session_start();

$result_array = [
    "success" => false,
    "server_error" => false
];

// XXX csrf check
if(isset($_SESSION['login_user_id']) && isset($_POST['user_id'])) {
    try {
        $dbh = Db::getHandle();
        $sql = '
        INSERT INTO
            `user_relationship`
            (
                `followed_user_id`,
                `follower_user_id`
            )
        VALUES
        (
            :followed_user_id,
            :follower_user_id
        )
        ;';
        $insert_sth = $dbh->prepare($sql);
        $insert_sth->bindValue(':followed_user_id', $_POST['user_id']);
        $insert_sth->bindValue(':follower_user_id', $_SESSION['login_user_id']);
        $insert_result = $insert_sth->execute();
        if($insert_result) {
            $result_array["success"] = true;
        }
    } catch(\Throwable $e) {
        $result_array["server_error"] = true;
    }
}

require_once(__DIR__ . '/../libs/fin.php');