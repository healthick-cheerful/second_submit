<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "entries_data" => false,
    "server_error" => false
];

if(isset($_SESSION['login_user_id'])) {
    try {
        $dbh = Db::getHandle();
        if(isset($_POST['last_id'])) {
            $select_sql = '
                SELECT
                    bbs_entries.id AS id,
                    bbs_entries.user_id,
                    bbs_entries.body,
                    bbs_entries.created_at,
                    users.name AS user_name,
                    users.icon_filename
                FROM
                    `bbs_entries`
                INNER JOIN
                    `users`
                ON
                    bbs_entries.user_id = users.id
                WHERE
                    bbs_entries.id < :last_id
                AND
                    (
                        bbs_entries.user_id
                        IN
                            (
                                SELECT
                                    `followed_user_id`
                                FROM
                                    `user_relationship`
                                WHERE
                                    `follower_user_id` = :login_user_id_first
                            )
                        OR
                            bbs_entries.user_id = :login_user_id_second
                    )
                ORDER BY
                    bbs_entries.id
                DESC
                LIMIT
                    10
            ;';
            $select_sth = $dbh->prepare($select_sql);
            // この環境ではエミュレート無効にしているためbindValueは2つ必要
            $select_sth->bindValue(':login_user_id_first', $_SESSION['login_user_id']);
            $select_sth->bindValue(':login_user_id_second', $_SESSION['login_user_id']);
            $select_sth->bindValue(':last_id', $_POST['last_id']);
        } else {
            $select_sql = '
                SELECT
                    bbs_entries.id AS id,
                    bbs_entries.user_id,
                    bbs_entries.body,
                    bbs_entries.created_at,
                    users.name AS user_name,
                    users.icon_filename
                FROM
                    `bbs_entries`
                INNER JOIN
                    `users`
                ON
                    bbs_entries.user_id = users.id
                WHERE
                    bbs_entries.user_id
                IN
                    (
                        SELECT
                            `followed_user_id`
                        FROM
                            `user_relationship`
                        WHERE
                            `follower_user_id` = :login_user_id_first
                    )
                OR
                    bbs_entries.user_id = :login_user_id_second
                ORDER BY
                    bbs_entries.id
                DESC
                LIMIT
                    10
            ;';
            $select_sth = $dbh->prepare($select_sql);
            // この環境ではエミュレート無効にしているためbindValueは2つ必要
            $select_sth->bindValue(':login_user_id_first', $_SESSION['login_user_id']);
            $select_sth->bindValue(':login_user_id_second', $_SESSION['login_user_id']);
        }
        $select_sth->execute();
        $entries_data = $select_sth->fetchAll();
        if($entries_data !== []) {
            $left_id = $entries_data[array_key_last($entries_data)]["id"] ?? "";
            $right_id = $entries_data[array_key_first($entries_data)]["id"] ?? "";
            $select_sql = '
                SELECT
                    *
                FROM
                    `bbs_images`
                WHERE
                    `entry_id`
                BETWEEN
                    :left_id
                AND
                    :right_id
            ;';
            $select_sth = $dbh->prepare($select_sql);
            $select_sth->bindValue(':left_id', $left_id);
            $select_sth->bindValue(':right_id', $right_id);
            $select_sth->execute();
            $images_data = $select_sth->fetchAll();
            $result_array["last_id"] = $left_id;
        } else {
            $images_data = [];
            $result_array["left_id"] = false;
        }

    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
        echo $e;
    }
    
    // 投稿データに画像データを追加
    foreach($entries_data as $key => $entry_row) {
        foreach($images_data as $image_row) {
            if($entry_row["id"] === $image_row["entry_id"]) {
                $entries_data[$key]["image_filenames"][] = $image_row["filename"];
            }
        }
    }
    $result_array["entries_data"] = $entries_data;
}

require_once(__DIR__ . '/../libs/fin.php');
