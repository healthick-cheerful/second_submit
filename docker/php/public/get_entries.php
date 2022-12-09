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
        $select_sql = '
            SELECT
                *
            FROM
                `bbs_entries`
            ORDER BY
                bbs_entries.id
            DESC
            LIMIT
                10
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->execute();
        $entries_data = $select_sth->fetchAll();
        $left_id = $entries_data[array_key_last($entries_data)]["id"];
        $right_id = $entries_data[array_key_first($entries_data)]["id"];
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
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
    }
    
    // 投稿データに画像データを追加
    foreach($entries_data as $key => $entry_row) {
        foreach($images_data as $image_row) {
            if($entry_row["id"] === $image_row["entry_id"]) {
                $entries_data[$key]["image_filenames"][] = $image_row["filename"];
            }
        }
    }
    $result_array["success"] = $entries_data;
}

require_once(__DIR__ . '/../libs/fin.php');
