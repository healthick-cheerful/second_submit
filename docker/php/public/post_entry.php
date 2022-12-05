<?php

require_once(__DIR__ . '/../libs/init.php');

header('Content-Type: application/json');

session_start();
$result_array = [
    "success" => false,
    "server_error" => false
];

// XXX CSRF対策必須

if(isset($_POST['body']) && $_SESSION['login_user_id']) {
    // 動作検証していません
    $image_filename = null;
    if(!empty($_POST['image_base64'])) {
        // data: _base64,のところを削る
        $base64 = preg_replace('/^data:.+base64,/', '', $_POST['image_base64']);
        // バイナリにして保存
        $image_binary = base64_decode($base64);
        $image_filename = strval(time()) . bin2hex(random_bytes(25)) . '.png';
        $filepath =  '/var/www/upload/image/' . $image_filename;
        file_put_contents($filepath, $image_binary);
    }
    try {
        $dbh = Db::getHandle();
        $insert_sql = '
            INSERT INTO
                `bbs_entries`
                (
                    `user_id`,
                    `body`,
                    `image_filename`
                )
            VALUES
                (
                    :user_id,
                    :body,
                    :image_filename
                )
            ;
        ';
        $insert_sth = $dbh->prepare($insert_sql);
        $insert_sth->bindValue(':user_id', $_SESSION['login_user_id']);
        $insert_sth->bindValue(':body', $_POST['body']);
        $insert_sth->bindValue(':image_filename', $image_filename);
        $insert_result = $insert_sth->execute();
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
    }

    if($insert_result) {
        $result_array["success"] = true;
    }
}

$result_json = json_encode($result_array);
echo $result_json;
return;