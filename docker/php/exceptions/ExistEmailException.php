<?php

class ExistEmailException extends Exception {
    public function __construct($message, $code = 0, $previos = null) {
        parent::__construct($message, $code, $previos);
    }
}