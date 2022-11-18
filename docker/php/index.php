<?php

$message = [
    'message' => "Hello axios!",
];
$message = json_encode($message);
header('Content-Type: application/json');
echo $message;