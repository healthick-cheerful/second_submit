<?php

require_once(__DIR__ . '/../libs/init.php');
session_start();

$result_array = [
    "success" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id']) && isset($_POST['user_id'])) {
    // 自分自身かどうかを確認する
    if($_SESSION['login_user_id'] === $_POST['user_id']) {
        $result_array['success'] = true;
        $result_array['follow'] = false;
    } else {
        try {
            $dbh = Db::getHandle();
            // 既にフォローしているか確認する
            $select_sql = '
                SELECT
                    *
                FROM
                    `user_relationship`
                WHERE
                    `follower_user_id` = :follower_user_id
                AND
                    `followed_user_id` = :followed_user_id
            ;';
            $select_sth = $dbh->prepare($select_sql);
            $select_sth->bindValue(':follower_user_id', $_SESSION['login_user_id']);
            $select_sth->bindValue(':followed_user_id', $_POST['user_id']);
            $select_sth->execute();
            $select_result = $select_sth->fetch();
            // データがなければ
            // あれば削除する
            if($select_result === false) {
                $result_array['success'] = true;
                $result_array['follow'] = false;
            } else {
                $result_array["success"] = true;
                $result_array['follow'] = true;
            }
        } catch(\Throwable $e) {
            $result_array["server_error"] = true;
            echo $e;
        }
    }

}

require_once(__DIR__ . '/../libs/fin.php');