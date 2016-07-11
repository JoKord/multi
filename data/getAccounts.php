<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$offset = $_GET['data'] * 2000;
$points = $db->getAccounts($offset);
header('Content-type: application/json');
echo json_encode($points);