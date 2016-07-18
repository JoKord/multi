<?php
require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$data = filter_input(INPUT_GET, 'data', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$conta = $db->getConta($data);
header('Content-type: application/json');
echo json_encode($conta);