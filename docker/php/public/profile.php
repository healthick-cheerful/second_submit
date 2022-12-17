<?php

require_once(__DIR__ . '/../libs/init.php');

session_start();
$result_array = [
    "user_data" => [],
    "server_error" => false
];

if(isset($_POST['user_id'])) {
    try {
        $dbh = Db::getHandle();
        $select_sql = '
        SELECT
            *
        FROM
            `users`
        WHERE
            `id` = :user_id
        ;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->bindValue(':user_id', $_POST['user_id']);
        $select_sth->execute();
        $select_result = $select_sth->fetch();
    } catch(\Throwable $e) {
        echo $e;
    }

    $result_array['user_data']['name'] = $select_result['name'];
    $result_array['user_data']['email'] = $select_result['email'];
    $result_array['user_data']['icon_filename'] = $select_result['icon_filename'];

}

require_once(__DIR__ . '/../libs/fin.php');
