<?php

class Db {
    public static function getHandle() {
        static $dbh = null;
        if($dbh === null) {
            try {
                $conf = Config::get('db');

                $host = $conf['host'];
                $dbname = $conf['dbname'];
                $user = $conf['user'];
                $pass = $conf['pass'];
                $charset = $conf['charset'];
                $options = $conf['options'];

                $dsn = "mysql:host=${host};dbname=${dbname};charset=${charset}";
                $dbh = new PDO($dsn, $user, $pass, $options);
            } catch(\Throwable $e) {
                return null;
            }
        }
        return $dbh;
    }
}