<?php

return [
    "db" => [
        "host" => "mysql",
        "dbname" => "techc",
        "user" => "root",
        "pass" => "",
        "charset" => "utf8mb4",
        "options" => [
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::MYSQL_ATTR_MULTI_STATEMENTS => false,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
        ]
    ]
];