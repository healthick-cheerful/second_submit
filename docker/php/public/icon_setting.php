<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "success" => false,
    "server_error" => false
];

if(!empty($_POST['icon']) && $_SESSION['login_user_id']) {
    if(!empty($_POST['icon'])) {
        $icon = $_POST['icon'];
        // data: _base64,のところを削る(必須、base64の仕様)
        $base64 = preg_replace('/^data:.+base64,/', '', $icon);
        // バイナリにして保存
        $icon_binary = base64_decode($base64);
        $icon_filename = strval(time()) . bin2hex(random_bytes(25)) . '.png';
        $filepath =  '/var/www/upload/image/' . $icon_filename;
        file_put_contents($filepath, $icon_binary);
        try {
            $dbh = Db::getHandle();
            $update_sql = '
                UPDATE
                    `users`
                SET
                    icon_filename = :icon
                WHERE
                    id = :user_id
            ;';
            $update_sth = $dbh->prepare($update_sql);
            $update_sth->bindValue(':icon', $icon_filename);
            $update_sth->bindValue(':user_id', $_SESSION['login_user_id']);
            $update_result = $update_sth->execute();
            if($update_result) {
                $result_array["success"] = true;
            }
        } catch(\Throwable $e) {
            $result_array['server_error'] = true;
        }
    }
}

require_once(__DIR__ . '/../libs/fin.php');
