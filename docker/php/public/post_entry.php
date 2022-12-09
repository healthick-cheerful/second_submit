<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "success" => false,
    "server_error" => false
];

if(isset($_POST['body']) && $_SESSION['login_user_id']) {
    $image_filename = null;
    $images = [];
    if(!empty($_POST['image_base64'])) {
        foreach($_POST['image_base64'] as $image) {
            // data: _base64,のところを削る(必須、base64の仕様)
            $base64 = preg_replace('/^data:.+base64,/', '', $image);
            // バイナリにして保存
            $image_binary = base64_decode($base64);
            $image_filename = strval(time()) . bin2hex(random_bytes(25)) . '.png';
            $filepath =  '/var/www/upload/image/' . $image_filename;
            file_put_contents($filepath, $image_binary);
            $images[] = $image_filename;
        }
    }
    try {
        $dbh = Db::getHandle();
        $dbh->beginTransaction();
        $insert_sql = '
            INSERT INTO
                `bbs_entries`
                (
                    `user_id`,
                    `body`
                )
            VALUES
            (
                :user_id,
                :body
            )
        ;';
        $insert_sth = $dbh->prepare($insert_sql);
        $insert_sth->bindValue(':user_id', $_SESSION['login_user_id']);
        $insert_sth->bindValue(':body', $_POST['body']);
        $insert_entry = $insert_sth->execute();
        if($images !== []) {
            $insert_images = [];
            foreach($images as $image) {
                $insert_sql = '
                    INSERT INTO
                        `bbs_images`
                        (
                            `entry_id`,
                            `filename`
                        )
                    VALUES
                    (
                        (
                            SELECT
                                `id`
                            FROM
                                `bbs_entries`
                            ORDER BY
                                id
                            DESC
                            LIMIT
                                1
                        ),
                        :filename
                    )
                ';
                $insert_sth = $dbh->prepare($insert_sql);
                $insert_sth->bindValue(':filename', $image);
                $insert_images[] = $insert_sth->execute();
            }
        }
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
    }
    if($dbh->inTransaction()) {
        $dbh->commit();
    }
    $insert_result = $insert_entry;
    if($images !== []) {
        foreach($insert_images as $result) {
            if($result !== true) {
                $insert_result = false;
                break;
            }
        }
    }
    if($insert_result) {
        $result_array["success"] = true;
    }
}

require_once(__DIR__ . '/../libs/fin.php');
