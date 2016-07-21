<?php

require_once './Database.php';
require_once './User.php';
require_once './PrivilegedUser.php';
require_once './Error.php';

session_start();

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

$db = new PDO('pgsql:host=gistree-db;dbname=multichoice', 'websig', 'e13cca4d70177737791b534655cd4c4c');
$User = new User($db, $username, $password);

$user_id = $User->login();
if ($user_id) {
    if (isset($_SESSION["user_id"])) {
        $res = PrivilegedUser::getByUserID($_SESSION["user_id"]);
    } else {
        $error = new Error(1);
    }
} else {
    $error = new Error(0);
}

if (!isset($error)) {
    header('Content-type: application/json');
    echo json_encode($res);
} else {
    header('HTTP/1.1 500 Internal Server Problem');
    header('Content-Type: application/json; charset=UTF-8');
    die("Error " . $error->getErrorCode() . " - " . $error->getErrorMsg());
}
