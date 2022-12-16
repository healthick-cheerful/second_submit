<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "user_list" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id'])) {
    try {
        $dbh = Db::getHandle();
        $select_sql = '
            SELECT
                `id`,
                `name`,
                `icon_filename`
            FROM
                `users`
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->execute();
        $users_result = $select_sth->fetchAll();
        $select_sql = '
            SELECT
                *
            FROM
                `user_relationship`
            WHERE
                `follower_user_id` = :login_user_id
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue('login_user_id', $_SESSION['login_user_id']);
        $select_sth->execute();
        $relationship_result = $select_sth->fetchAll();
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
        echo $e;
    }
    $user_list = [];
    foreach($users_result as $key => $user) {
        $user_list[$key] = $user;
        $user_list[$key]['follow'] = false;
        foreach($relationship_result as $re) {
            if($re['followed_user_id'] === $user['id']) {
                $user_list[$key]['follow'] = true;
            } 
        }
    }
    $result_array['user_list'] = $user_list;
}

require_once(__DIR__ . '/../libs/fin.php');
