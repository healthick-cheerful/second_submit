<?php

require_once(__DIR__ . '/../libs/init.php');

header('Content-Type: application/json');

$result_array = [
    "success" => false,
    "exist_email" => false,
    "server_error" => false
];

if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['password'])) {
    // XXX validate追加
    try {
        // DBに接続
        $dbh = Db::getHandle();

        $select_sql = 'SELECT `email` FROM `users`;';
        $select_sth = $dbh->prepare($select_sql);
        $select_sth->execute();
        $select_result = $select_sth->fetchAll(PDO::FETCH_COLUMN);
        
        foreach($select_result as $value) {
            if($_POST['email'] === $value) {
                throw new \ExistEmailException('');
            }
        }

        $password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $insert_sql = 'INSERT INTO `users` (`name`, `email`, `password`) VALUES(:name, :email, :password);';
        $insert_sth = $dbh->prepare($insert_sql);
        $insert_sth->bindValue(':name', $_POST['name'], PDO::PARAM_STR);
        $insert_sth->bindValue(':email', $_POST['email'], PDO::PARAM_STR);
        $insert_sth->bindValue(':password', $password_hash, PDO::PARAM_STR);
        $insert_result = $insert_sth->execute();

        if($insert_result) {
            $result_array['success'] = true;
        }
    } catch(\ExistEmailException $e) {
        $result_array['exist_email'] = true;
    } catch(\Throwable $e) {
        $result_array['server_error'] = true;
    }
}

$result_json = json_encode($result_array);
echo $result_json;
return;