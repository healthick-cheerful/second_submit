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
        // データがなければ挿入する
        // あれば削除する
        if($select_result === false) {
            $insert_sql = '
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
            $insert_sth = $dbh->prepare($insert_sql);
            $insert_sth->bindValue(':followed_user_id', $_POST['user_id']);
            $insert_sth->bindValue(':follower_user_id', $_SESSION['login_user_id']);
            $insert_result = $insert_sth->execute();
            if($insert_result) {
                $result_array["success"] = true;
                $result_array['follow'] = true;
            }
        } else {
            $delete_sql = '
                DELETE FROM
                    `user_relationship`
                WHERE
                    `follower_user_id` = :follower_user_id
                AND
                    `followed_user_id` = :followed_user_id
            ;';
            $delete_sth = $dbh->prepare($delete_sql);
            $delete_sth->bindValue(':followed_user_id', $_POST['user_id']);
            $delete_sth->bindValue(':follower_user_id', $_SESSION['login_user_id']);
            $delete_result = $delete_sth->execute();
            if($delete_result) {
                $result_array["success"] = true;
                $result_array['follow'] = false;
            }
        }
    } catch(\Throwable $e) {
        $result_array["server_error"] = true;
        echo $e;
    }
}

require_once(__DIR__ . '/../libs/fin.php');