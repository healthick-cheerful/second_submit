<?php

require_once(__DIR__ . '/../libs/init.php');
session_start();

$result_array = [
    "success" => false,
    "server_error" => false,
    "user_data" => []
];

if(isset($_SESSION['login_user_id'])) {
    try {
        $dbh = Db::getHandle();
        $select_sql = '
            SELECT
                *
            FROM
                `users`
            WHERE
                id = :login_user_id
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue(':login_user_id', $_SESSION['login_user_id']);
        $select_sth->execute();
        $select_result = $select_sth->fetchAll();
        unset($select_result[0]['password']);
        unset($select_result[0]['created_at']);
        foreach($select_result[0] as $key => $value) {
            $user_data[$key] = $value;
        }
        if($select_result) {
            $result_array['success'] = true;
            $result_array['user_data'] = $user_data;
        }
    } catch(\Throwable $e) {
        $result_array["server_error"] = true;
    }
}
require_once(__DIR__ . '/../libs/fin.php');