<?php

require_once(__DIR__ . '/../libs/init.php');
session_start();

$result_array = [
    "success" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id']) && isset($_POST['entry_id'])) {
    // 既にブックマークしているか確認する
    try {
        $dbh = Db::getHandle();
        $select_sql = '
            SELECT
                *
            FROM
                `bookmark`
            WHERE
                `user_id` = :user_id
            AND
                `entry_id` = :entry_id
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue(':user_id', $_SESSION['login_user_id']);
        $select_sth->bindValue(':entry_id', $_POST['entry_id']);
        $select_sth->execute();
        $select_result = $select_sth->fetch();
        // データがなければ挿入する
        // あれば削除する
        if($select_result === false) {
            $insert_sql = '
                INSERT INTO
                    `bookmark`
                    (
                        `user_id`,
                        `entry_id`
                    )
                VALUES
                (
                    :user_id,
                    :entry_id
                )
            ;';
            $insert_sth = $dbh->prepare($insert_sql);
            $insert_sth->bindValue(':user_id', $_SESSION['login_user_id']);
            $insert_sth->bindValue(':entry_id', $_POST['entry_id']);
            $insert_result = $insert_sth->execute();
            if($insert_result) {
                $result_array['success'] = true;
                $result_array['bookmark'] = true;
            }
        } else {
            $delete_sql = '
                DELETE FROM
                    `bookmark`
                WHERE
                    `user_id` = :user_id
                AND
                    `entry_id` = :entry_id
            ;';
            $delete_sth = $dbh->prepare($delete_sql);
            $delete_sth->bindValue(':user_id', $_SESSION['login_user_id']);
            $delete_sth->bindValue(':entry_id', $_POST['entry_id']);
            $delete_result = $delete_sth->execute();
            if($delete_result) {
                $result_array['success'] = true;
                $result_array['bookmark'] = false;
            }
        }
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
        echo $e;
    }
}

require_once(__DIR__ . '/../libs/fin.php');