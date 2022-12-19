<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "follow_list" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id'])) {
    try {
        $dbh = Db::getHandle();
        $select_sql = '
            SELECT
                `followed_user_id`
            FROM
                `user_relationship`
            WHERE
                `follower_user_id` = :login_user_id
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue(':login_user_id', $_SESSION['login_user_id']);
        $select_sth->execute();
        $select_result = $select_sth->fetchAll();
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
        echo $e;
    }
    if($select_result) {
        $result_array['follow_list'] = [];
        foreach($select_result as $value) {
            $result_array['follow_list'][] = $value['followed_user_id'];
        }
        // phpのソート関数は引数に渡された配列を直接変更します
        sort($result_array['follow_list']);
    } else {
        $result_array['follow_list'] = [];
    }
}

require_once(__DIR__ . '/../libs/fin.php');
