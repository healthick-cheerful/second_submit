<?php

class Config {
    public static function get($key, $default = null) {
        static $config_data = null;
        if($config_data === null) {
            $environment_config = require_once(BASEPATH . '/environment_config.php');
            $config = require_once(BASEPATH . '/config.php');
            $config_data = $environment_config + $config;
        }
        return $config_data[$key] ?? $default;
    }
}