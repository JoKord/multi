<?php

require_once '../classes/Error.php';

session_start();

if (session_destroy()) {
    $_SESSION = array();
    header('Content-type: application/json');
    echo json_encode("Sessão terminada com sucesso");
} else {
    $error = new Error(200);
    header('HTTP/1.1 500 Internal Server Problem');
    header('Content-Type: application/json; charset=UTF-8');
    die("Error " . $error->getErrorCode() . " - " . $error->getErrorMsg());
}
